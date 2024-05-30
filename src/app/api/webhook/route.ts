import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET ?? "");

export async function POST(req: Request) {
  try {
    const body = await req.text();

    const signature = headers().get("stripe-signature");

    const event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "invoice.payment_succeeded") {
      console.log("🚀🔥 Customer ID stripe-webhook : ", event.data.object.customer);
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "something went wrong",
        ok: false,
      },
      { status: 500 }
    );
  }
}
