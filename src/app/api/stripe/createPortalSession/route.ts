import { NextResponse } from "next/server";
import Stripe from "stripe"


export async function POST(req : Request, res : Response) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    try {
        const { customerID } = await req.json()
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerID,
            return_url: `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard/profile`
        })

        console.log(portalSession.url);
        return NextResponse.json(portalSession.url)
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}