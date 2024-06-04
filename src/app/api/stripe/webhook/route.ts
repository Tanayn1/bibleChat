import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "../../../../../utils/supabase/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


export async function POST(req : Request, res : Response) {
    const supabase = createClient();
    const payload = await req.text()
    const sig = req.headers.get('Stripe-Signature')
    try {
        let event = stripe.webhooks.constructEvent(
            payload,
            sig!,
            process.env.STRIPE_WEBHOOK_SECRET!,
        )
        console.log("event", event.type)
        const data = event.data.object
        switch (event.type) {
            case 'checkout.session.completed':
                updatePlanAfterCheckout(data, supabase)
                break
            case 'customer.subscription.created':
                addSubcriptionAfterCreation(data, supabase)
                break;
            case 'customer.subscription.updated':
                return NextResponse.json('Subscription Updated')
            case 'customer.subscription.deleted':
                handleSubscriptionDeletion(data, supabase)
                break;
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

}