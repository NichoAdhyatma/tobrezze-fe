import { stripe } from "@/lib/stripe";

export async function checkSubscriptionStatus(customerId: string) {

  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });

    if (subscriptions.data.length > 0) {
      const currentSubscription = subscriptions.data[0];
      return {
        isActive: true,
        currentSubscription: currentSubscription,
      };
    } else {
      return {
        isActive: false,
      };
    }
  } catch (error) {
    console.error("Error checking subscription status:", error);
    throw error;
  }
}

export async function createSubscriptionIfNotActive(
  customerId: string,
  priceId: string
) {
  const subscriptionStatus = await checkSubscriptionStatus(customerId);

  if (subscriptionStatus.isActive) {
    return {
      success: false,
      message: "You already have an active subscription.",
      currentSubscription: subscriptionStatus.currentSubscription,
    };
  } else {
  

    try {
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
      });

      return {
        success: true,
        subscription: subscription,
      };
    } catch (error) {
      console.error("Error creating subscription:", error);
      throw error;
    }
  }
}
