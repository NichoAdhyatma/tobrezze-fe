import Stripe from "stripe";

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET ?? "");

  const body = await request.json();

  try {
    if (body.customerId.trim().length === 0) {
      return Response.json({ isActive: false });
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: body.customerId,
      status: "active",
      limit: 1,
    });

    const isActive = subscriptions.data.length > 0;

    return Response.json({ isActive: isActive });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: "An error occurred" }, { status: 500 });
  }
}
