"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { handlePayment } from "@/app/action";
import Stripe from "stripe";

interface ProductCardProps {
  product: Stripe.Product;
  customer: string;
  price: Stripe.Price;
  userId?: string;
  email: string;
  nameUser: string
}

export default function ProductCard({
  product,
  customer,
  price,
  userId,
  email,
  nameUser
}: ProductCardProps) {
  const { name, description, images, default_price } = product;

  return (
    <Card className="w-[250px]">
      <CardHeader>
        <CardTitle className="text-center">{name}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {images.map((imageSrc) => (
          <Image
            className="mx-auto"
            key={imageSrc}
            src={imageSrc}
            width={100}
            height={100}
            alt="product-image"
          />
        ))}

        <div className="flex w-full justify-center items-center gap-2">
          <p className="text-semibold text-center my-2 text-2xl">
            {price.unit_amount! / 100}.00 $
          </p>
          <p className="text-bold">
            {price.type == "recurring" && `/ ${price.recurring?.interval}`}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          className={price.type ==  "one_time" ? "bg-blue-500 !hover:bg-blue-400" : "bg-primary"}
          onClick={() =>
            handlePayment({
              priceId: default_price,
              customer: customer,
              quantity: 1,
              mode: price.type == "one_time" ? "payment" : "subscription",
              userId: userId ?? "",
              email: email,
              name: nameUser
            })
          }
        >
          {price.type == "one_time" ? "Checkout" : "Subscribe"} now
        </Button>
      </CardFooter>
    </Card>
  );
}
