import { NextRequest } from "next/server";
import Stripe from "stripe";
import { storeCustomerIdSupabase } from "../webhook/actions";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET ?? "");

  try {
    const body = await req.json();
    const { customer, priceId, quantity, mode, userId, email, name } = body;

    let customerId = customer;

    if (!customerId) {
      const newCustomer = await stripe.customers.create({
        email: email,
        name: name,
      });

      customerId = newCustomer.id;

      storeCustomerIdSupabase(customerId, userId);
    }

    const params: Stripe.Checkout.SessionCreateParams = {
      ui_mode: "embedded",
      mode: mode,
      customer: customerId,
      return_url: "http://localhost:3000",
      line_items: [
        {
          price: priceId,
          quantity: quantity,
        },
      ],
      metadata: {
        user_id: userId,
      },
    };

    const session = await stripe.checkout.sessions.create(params);

    return Response.json({ status: true, clien_secret: session.client_secret });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    Response.json({ error, status: false });
  }
}
