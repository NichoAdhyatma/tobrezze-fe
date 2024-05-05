import { Button } from "@/components/ui/button";
import GmailIcon from "@/assets/gmail.png";
import Image from "next/image";

export default function NotificationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 mx-auto">
      <p>Check Your Email for Activation!</p>

      <a
      target="blank"
        href="https://mail.google.com
      "
      >
        <Button
          variant={"outline"}
          fullWidth={false}
          icon={
            <Image width={20} height={20} src={GmailIcon} alt={"gmail-icon"} />
          }
        >
          Open gmail
        </Button>
      </a>
    </main>
  );
}
