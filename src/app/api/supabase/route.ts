import { createSupabaseServerSide } from "@/lib/supabase/supabase-server-side";

export async function POST(req: Request) {
  const request = await req.json();

  const supabase = createSupabaseServerSide();

  const userId = (await supabase.auth.getUser()).data.user?.id;

  const response = await supabase
    .from("profiles")
    .update({
      customer_id: request.customer_id,
    })
    .eq("id", userId);

  return response.status;
}

