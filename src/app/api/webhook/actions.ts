import { createSupabaseServerSide } from "@/lib/supabase/supabase-server-side";
import Stripe from "stripe";

export const storeCustomerIdSupabase = async (
  customerId: string | Stripe.Customer | Stripe.DeletedCustomer | null,
  userId: string
) => {
  const supabase = createSupabaseServerSide();

  console.log("🚀 Customer Id Inn Supabase", customerId);

  console.log("🚀 UserId", userId);

  const response = await supabase
    .from("profiles")
    .update({
      customer_id: customerId,
    })
    .eq("id", userId);

  if (response.error) return response.error;
  
  return response.status
};

export const getListProducts = async () => {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET ?? "");

  const response = await stripe.products.list();

  return response.data;
};

export const getListSubscription = async (customer: string) => {
  if (customer) {
    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET ?? "");

    const response = await stripe.subscriptions.list({
      customer: customer,
    });
    return response.data;
  }
};
