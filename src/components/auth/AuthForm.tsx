import { AuthPageType } from "@/core/enum/auth/enum";
import { useState } from "react";
import { FormComponent } from "@/components/auth/FormComponent";

export default function AuthForm() {
  const [authPageType, setAuthPageType] = useState<AuthPageType>(
    AuthPageType.signIn
  );

  return authPageType === AuthPageType.signIn ? (
    <FormComponent
      title={"Welcome Back"}
      onPageClick={() => {
        const changeTo = AuthPageType.signUp;

        setAuthPageType(changeTo);
      }}
      text1="Don't have an account?"
      text2="Sign Up"
      pageType={AuthPageType.signIn}
    />
  ) : (
    <FormComponent
      title={"Create New Account"}
      onPageClick={() => {
        const changeTo = AuthPageType.signIn;

        setAuthPageType(changeTo);
      }}
      text1="Already have an account?"
      text2="Sign in"
      pageType={AuthPageType.signUp}
    />
  );
}
