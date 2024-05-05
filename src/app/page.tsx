

import SignOut from "@/components/auth/SignOut";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@/core/types/auth/user";
import { createSupabaseServerSide } from "@/lib/supabase/supabase-server-side";

export default async function Home() {
  const supabase = createSupabaseServerSide();
  const user: User | null = (await supabase.auth.getUser()).data.user;

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <div>
        Welcome, <strong>{user?.user_metadata?.name}</strong>
       
      </div>

      <div className="flex flex-col gap-2">
        <Input disabled defaultValue={user?.email}/>
        <Button size={"sm"} fullWidth={false}>Change Email</Button>
      </div>

      <div className="flex gap-2 text-sm mt-10">
        {user ? (
          <SignOut />
        ) : (
          <a href="/auth">
            <Button>Sign in</Button>
          </a>
        )}
      </div>
    </div>
  );
}
