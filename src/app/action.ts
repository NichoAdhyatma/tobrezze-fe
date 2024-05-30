import { SupabaseClient } from "@supabase/supabase-js";
import Stripe from "stripe";

export const handlePayment = async ({
  priceId,
  customer,
  quantity,
  mode,
  userId,
  email,
  name,
}: {
  priceId: string | Stripe.Price | null | undefined;
  customer: string;
  quantity: number;
  mode?: string;
  userId: string;
  email: string;
  name: string;
}) => {
  try {
    const response = await fetch("/api/stripe", {
      method: "POST",
      body: JSON.stringify({
        customer,
        priceId,
        quantity,
        mode,
        userId,
        email,
        name,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      window.location.href = data.url;
    } else {
      console.error("Error from server:", data.error);
    }
  } catch (error) {
    console.error("Network or other error:", error);
  }
};

export const handleEmbedPayment = async ({
  priceId,
  customer,
  quantity,
  mode,
  userId,
  email,
  name,
}: {
  priceId: string | Stripe.Price | null | undefined;
  customer: string;
  quantity: number;
  mode?: string;
  userId: string;
  email: string;
  name: string;
}) => {
  try {
    const response = await fetch("/api/payment", {
      method: "POST",
      body: JSON.stringify({
        customer,
        priceId,
        quantity,
        mode,
        userId,
        email,
        name,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      window.location.href = data.url;
    } else {
      console.error("Error from server:", data.error);
    }
  } catch (error) {
    console.error("Network or other error:", error);
  }
};

export const getCustomerId = async (
  supabase: SupabaseClient<any, "public", any>,
  userId: string
) => {
  const { data } = await supabase
    .from("profiles")
    .select("customer_id")
    .limit(1)
    .eq("id", userId)
    .single();

  return data?.customer_id;
};

export const getPrices = async () => {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET ?? "");

  const prices = await stripe.prices.list({
    limit: 3,
  });

  return prices.data;
};
