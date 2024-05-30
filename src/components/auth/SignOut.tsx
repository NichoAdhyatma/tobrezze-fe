
import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import { createSupabaseServerSide } from "@/lib/supabase/supabase-server-side";


export default function SignOut() {
  
  const logout = async () => {
    "use server"
    const supabase = createSupabaseServerSide();
    await supabase.auth.signOut();
    redirect("/auth")
  }

  return (
    <form>
      <Button size={"sm"} variant={"outline"} formAction={logout} > 
        Sign out
      </Button>
    </form>
  )
}