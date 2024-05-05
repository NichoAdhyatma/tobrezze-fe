"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import GoogleIcon from "@/assets/google.png";
import GithubIcon from "@/assets/github.png";
import AuthForm from "@/components/auth/AuthForm";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-[75vh] gap-10">
      <p
        onClick={() => router.push("/")}
        className="text-2xl font-bold cursor-pointer"
      >
        ToBrezz.
      </p>

      <div className="flex flex-col justify-center items-center gap-2 w-full max-w-[18rem]">
        <AuthForm />

        <Separator middleText="OR" className="my-5" />

        <Button
          variant={"outline"}
          icon={
            <Image
              width={20}
              height={20}
              src={GoogleIcon}
              alt={"Google Icon"}
            />
          }
        >
          <span>Continue with Google</span>
        </Button>

        <Button
          variant={"outline"}
          icon={
            <Image
              width={20}
              height={20}
              src={GithubIcon}
              alt={"Google Icon"}
            />
          }
          
        >
          <span>Continue with Github</span>
        </Button>
      </div>
    </div>
  );
}
