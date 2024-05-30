import SignOut from "@/components/auth/SignOut";
import { Button } from "@/components/ui/button";
import { User } from "@/core/types/auth/user";
import { createSupabaseServerSide } from "@/lib/supabase/supabase-server-side";
import { getListProducts, getListSubscription } from "./api/webhook/actions";
import ProductCard from "@/components/product/ProductCard";
import { getCustomerId, getPrices } from "./action";
import { AvatarProfile } from "@/components/common/AvatarProfile";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { TableSubscription } from "@/components/subscription/Table";

const stripePromise = loadStripe(
  "pk_test_51PDivaAHLsGlsj8Lqc9POyDC5GFqiRLpVEc78PJ0rXR8BW9ss6TUGfVP8beJAwrxz2a2uYMXYEnIIXgsukV7iDFI00wQCALFJt"
);

export default async function Home() {
  const supabase = createSupabaseServerSide();

  const user: User | null = (await supabase.auth.getUser()).data.user;

  const products = await getListProducts();

  const customer = await getCustomerId(supabase, user?.id ?? "");

  const subscriptions = await getListSubscription(customer);

  const prices = await getPrices();

  console.log(subscriptions);

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <div className="flex gap-2 items-center">
        <AvatarProfile src={user?.user_metadata?.avatar_url} />
        <div>
          Welcome, <strong>{user ? user?.user_metadata?.name : "Guest"}</strong>
        </div>
        <div className="flex gap-2 text-sm">
          {user ? (
            <SignOut />
          ) : (
            <a href="/auth">
              <Button>Sign in</Button>
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {user &&
          products.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              customer={customer}
              price={prices[index]}
              userId={user.id}
              email={user.email ?? ""}
              nameUser={user.user_metadata?.name ?? ""}
            />
          ))}
      </div>

      {user && <p className="text-2xl font-semibold">Active Subscription</p>}

     
        {user && (
          <TableSubscription
            products={products}
            subscriptions={subscriptions}
          />
        )}
      
    </div>
  );
}
