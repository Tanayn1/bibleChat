import { NextResponse } from "next/server";
import Stripe from "stripe";


export async function POST(req: Request, res : Response) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    try {
        const { userID, email, priceID } = await req.json();
        const checkout = await stripe.checkout.sessions.create({
            customer_email: email,
            line_items: [{
                price: priceID,
                quantity: 1
            }],
            metadata: {
                userID: userID,
                email: email
            },
            mode: 'subscription',
            subscription_data: {
                trial_period_days: 3
            },
            success_url: 'http://localhost:3000/dashboard'
        });

        return NextResponse.json(checkout.url)
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}