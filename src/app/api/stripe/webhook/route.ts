import { NextResponse } from "next/server"
import Stripe from "stripe"
import { serviceSupabase } from "../../../../../utils/supabase/service";



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const fetchUserID = async (supabase : any, customerEmail : any)=>{
  const response : any = await supabase
  .from('users')
  .select('*')
  .eq('email', customerEmail)
  if (response) 
    {return response.data.id} else {
      return null
    }
}

const updateStatus = async (supabase : any, data : any, userID : any)=>{
  const updateStatus : any = await supabase
  .from('subscriptions')
  .update({
    status: data.status
  })
  .eq('user_id', userID)
  if (updateStatus.error) return null
  return true
}


export async function POST(req : Request, res : Response) {
    const supabase = serviceSupabase();
    const payload = await req.text();
    const sig = req.headers.get('Stripe-Signature');
    console.log(process.env.STRIPE_WEBHOOK_SECRET)
    try {
        let event = stripe.webhooks.constructEvent(
            payload,
            sig!,
            process.env.STRIPE_WEBHOOK_SECRET!,
        )
        console.log("event", event.type)
        const data : any = event.data.object
        let userID;
        const customerEmail = await getCustomerEmail(data.customer as string);
        switch (event.type) {
            case 'checkout.session.completed':
              const metadata = data.metadata
              userID = metadata?.userID
              const customerID = data.customer
              console.log(customerID, userID)
              const res = await supabase
              .from('users')
              .update({
                  plan: 'pro',
                  stripe_customer_id: customerID
              })
              .eq('id', userID)
              .select()
              console.log(res.data)
              console.log(res.error)
              if (res.error) return NextResponse.json(res.error)
              return NextResponse.json('Success');

            case 'customer.subscription.created':

              if (!customerEmail) {
                  return NextResponse.json({
                    status: 500,
                    error: 'Customer email could not be fetched',
                  });
                }
                const response : any = await supabase
                .from('users')
                .select('*')
                .eq('email', customerEmail)
                if (response.error) return NextResponse.json({status: 500, error: 'uuid could not be fetched'});
                userID = response.data.id
                console.log(data.items.data[0].plan.interval)
                console.log(data.status)
                const createSubscription = await supabase
                .from('subscriptions') 
                .insert({
                  user_id: userID,
                  type: data.items.data[0].plan.interval,
                  status: data.status
                })
                if (createSubscription.error) return NextResponse.json({status: 500, error: createSubscription.error});
                return NextResponse.json({status: 200, response: 'Subscription Created'})
          
            case 'customer.subscription.updated':

              userID = await fetchUserID(supabase, customerEmail)
              if (!userID) return NextResponse.json({status: 500, error: 'UserID could not be fetched'})
              console.log(userID)
              await updateStatus(supabase, data, userID)                
              return NextResponse.json({status: 200, response: 'Success'})
              

            case 'customer.subscription.deleted':

              if (!customerEmail) {
                  return NextResponse.json({
                    status: 500,
                    error: 'Customer email could not be fetched',
                  });
                }
                userID = await fetchUserID(supabase, customerEmail)
                if (!userID) return NextResponse.json({status: 500, error: 'UserID could not be fetched'})
                console.log(userID)
                const updatePlanStatus : any = await supabase
                .from('users')
                .update({
                  plan: 'free'
                })
                .eq('id', userID)
                if (updatePlanStatus.error) return NextResponse.json({status: 500, error: `Error Updating User: ${updatePlanStatus.error}`});
                console.log(data.items.data[0].plan.interval, data.status);
                await updateStatus(supabase, data, userID)                
                return NextResponse.json({status: 200, response: 'Success'})
            default:
                return NextResponse.json({
                    status: 400,
                    error: 'Unhandled Event Type'
                })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}



const updatePlanAfterCheckout = async (data : any, supabase : any)=>{
    const metadata = data.metadata
    const userID = metadata?.userID
    const customerID = data.customer
    console.log(customerID, userID)
    const res = await supabase
    .from('users')
    .update({
        plan: 'pro',
        stripe_customer_id: customerID
    })
    .eq('id', userID) 
    if (res.error) return NextResponse.json(res.error)
    return NextResponse.json('Success');
}

const addSubcriptionAfterCreation = async (data : any, supabase : any)=>{
    const customerEmail = await getCustomerEmail(data.customer as string);
    if (!customerEmail) {
        return NextResponse.json({
          status: 500,
          error: 'Customer email could not be fetched',
        });
      }
      const response : any = await supabase
      .from('users')
      .select('*')
      .eq('email', customerEmail)
      if (response.error) return NextResponse.json({status: 500, error: 'uuid could not be fetched'});
      const userID = response.data.id
      console.log(data.items.data[0].plan.interval)
      console.log(data.status)
      const res = await supabase
      .from('subscriptions')
      .insert({
        user_id: userID,
        type: data.items.data[0].plan.interval,
        status: data.status
      })
      if (res.error) return NextResponse.json({status: 500, error: res.error});
      return NextResponse.json({status: 200, response: 'Subscription Created'})


}

async function getCustomerEmail(customerId: string): Promise<string | null> {
    try {
      const customer = await stripe.customers.retrieve(customerId);
      return (customer as Stripe.Customer).email;
    } catch (error) {
      console.error('Error fetching customer:', error);
      return null;
    }
  }


  const handleSubscriptionDeletion = async (data : any, supabase : any)=>{
    const customerEmail = await getCustomerEmail(data.customer as string);
    if (!customerEmail) {
        return NextResponse.json({
          status: 500,
          error: 'Customer email could not be fetched',
        });
      }
      const response : any = await supabase
      .from('users')
      .select('*')
      .eq('email', customerEmail)
      if (response.error) return NextResponse.json({status: 500, error: 'uuid could not be fetched'});
      const userID = response.data.id;
      const updatePlanStatus : any = await supabase
      .from('users')
      .updage({
        plan: 'free'
      })
      .eq('id', userID)
      if (updatePlanStatus.error) return NextResponse.json({status: 500, error: `Error Updating User: ${updatePlanStatus.error}`});
      console.log(data.items.data[0].plan.interval, data.status);
      const res : any = await supabase
      .from('subscriptions')
      .update({
        status: data.status
      })
      .eq('user_id', userID)
      if (res.error) return NextResponse.json({status: 500, error: res.error});
      return NextResponse.json({status: 200, response: 'Subscription Deleted'})


}

const updateSubscriptionUpdated = async (data : any, supabase : any)=>{
  const customerEmail = await getCustomerEmail(data.customer as string);
  if (!customerEmail) {
    return NextResponse.json({
      status: 500,
      error: 'Customer email could not be fetched',
    });
  };

  const response : any = await supabase
  .from('users')
  .select('*')
  .eq('email', customerEmail)
  if (response.error)    {
    return NextResponse.json({
    status: 500,
    error: response.error,
  });
};
  const userID = response.data.id;

}