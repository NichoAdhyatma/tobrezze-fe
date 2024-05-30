import { NextRequest } from "next/server";
import Stripe from "stripe";
import { storeCustomerIdSupabase } from "../webhook/actions";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET ?? "");

export async function POST(req: NextRequest) {
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
      success_url: "http://localhost:3000",
      cancel_url: "http://localhost:3000",
      mode: mode,
      customer: customerId,
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

    console.log("Client secret sesion : " ,session.client_secret);
    

    return Response.json({ status: true, url: session.url });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    Response.json({ error, status: false });
  }
}
