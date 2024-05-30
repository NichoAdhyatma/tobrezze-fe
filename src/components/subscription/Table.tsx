"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertTimestampToDate } from "@/core/utils/date";
import Stripe from "stripe";
import { Badge } from "../ui/badge";

export function TableSubscription({
  subscriptions,
  products,
}: {
  subscriptions?: Stripe.Subscription[];
  products?: Stripe.Product[];
}) {
  const getProduct = (id: string) => {
    return products?.find((value) => value.id == id);
  };

  console.log(subscriptions);

  return (
    <Table>
      <TableCaption>A list of your recent subsciption.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Frequency</TableHead>
          <TableHead>Next Invoice</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subscriptions
          ? subscriptions.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell className="font-medium">{subscription.id}</TableCell>
                <TableCell>
                  {
                    getProduct(
                      subscription.items.data[0].plan.product?.toString() ?? ""
                    )?.name
                  }{" "}
                  <Badge variant={"success"} className="ml2">{subscription.status}</Badge>
                </TableCell>
                <TableCell>
                  Billing {subscription.items.data[0].plan.interval}ly
                </TableCell>
                <TableCell>
                  {convertTimestampToDate(subscription.current_period_end)} for{" "}
                  {subscription.items.data[0].plan.amount! / 100}$
                </TableCell>
              </TableRow>
            ))
          : "Loading..."}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{subscriptions?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
