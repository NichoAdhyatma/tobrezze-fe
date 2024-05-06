import SignOut from "@/components/auth/SignOut";
import PricingPage from "@/components/product";

import { Button } from "@/components/ui/button";
import { User } from "@/core/types/auth/user";
import { createSupabaseServerSide } from "@/lib/supabase/supabase-server-side";

export default async function Home() {
  const supabase = createSupabaseServerSide();
  const user: User | null = (await supabase.auth.getUser()).data.user;

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <div className="flex gap-4 items-center">
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

      {user && <PricingPage />}
    </div>
  );
}
