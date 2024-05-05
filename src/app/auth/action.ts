"use server";

import { SignInForm } from "@/core/types/auth/signin";
import { SignUpForm } from "@/core/types/auth/signup";
import { createSupabaseServerSide } from "@/lib/supabase/supabase-server-side";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signIn(formData: SignInForm) {
  const supabase = createSupabaseServerSide();

  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    console.log(error.message)
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: SignUpForm) {
  const supabase = createSupabaseServerSide();

  const {error} = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: { data: { name: formData.name } },
  });

  if(error) {
    console.log(error.message)
    redirect("/error");
  }


  revalidatePath("/", "layout");
  redirect("/auth/verification");
}
