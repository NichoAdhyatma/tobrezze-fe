import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { MouseEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn, signup } from "@/app/auth/action";
import { AuthPageType } from "@/core/enum/auth/enum";
import { authFormSchemaSignUp } from "@/lib/zod/auth-schema";

interface AuthFormProps {
  pageType: AuthPageType;
  title: string;
  onPageClick?: MouseEventHandler<HTMLSpanElement>;
  text1?: string;
  text2?: string;
}

export const FormComponent = ({
  title,
  onPageClick,
  text1,
  text2,
  pageType,
}: AuthFormProps) => {
  const [isContinue, setIsContinue] = useState<boolean>(false);

  const form = useForm<z.infer<typeof authFormSchemaSignUp>>({
    resolver: zodResolver(authFormSchemaSignUp),
    defaultValues: {
      name: "Username",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof authFormSchemaSignUp>) {
    pageType === AuthPageType.signUp ? signup(values) : signIn(values);
  }

  const handleClickContinue = () => {
    setIsContinue(true);
  };

  return (
    <Form {...form}>
      <p className="text-2xl font-semibold">{title}</p>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-3 w-full max-w-[18rem] mt-5"
      >
        {pageType === AuthPageType.signUp && isContinue && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Email Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isContinue && (
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />

                <div className="flex justify-end">
                  {pageType === AuthPageType.signIn && (
                    <Button size={"sm"} fullWidth={false} variant={"link"}>
                      Forgot password?
                    </Button>
                  )}
                </div>
              </FormItem>
            )}
          />
        )}

        <div className="w-full">
          {isContinue ? (
            <Button type="submit">
              {pageType === AuthPageType.signIn ? "Sign in" : "Sign up"}
            </Button>
          ) : (
            <Button type="button" onClick={handleClickContinue}>
              Continue
            </Button>
          )}
        </div>
      </form>
      <div className="w-full text-xs text-center">
        <span className="mr-1">{text1}</span>
        <span className="font-bold cursor-pointer" onClick={onPageClick}>
          {text2}
        </span>
      </div>
    </Form>
  );
};
