"use client";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import formatPriceInCents from "@/lib/formatPriceInCents";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const Checkout = () => {
  const items = useCartStore((state) => state.items);
  const [total, seTotal] = useState(0);

  useEffect(() => {
    seTotal(
      items.reduce(
        (acc, item) => acc + item.quantity * item.product.priceInCents,
        0
      )
    );
  }, [items]);

  return (
    <Card className="w-[90%] flex flex-col items-center my-2 mx-auto  ">
      <div className="w-full flex justify-between">
        <h2 className="text-xl mt-2 ml-2">Cart Items</h2>
        <h2 className="text-xl mt-2 mr-2">quantity</h2>
        <h2 className="text-xl mt-2 mr-2">subtotal</h2>
      </div>
      <ScrollArea className="w-full rounded-md  p-4">
        {items.map((item) => {
          return (
            <div
              key={item.product.id}
              className="flex my-4 border rounded-lg p-2 justify-between items-center mb-2"
            >
              <p className="w-[30%]">
                {item.product.name} 
              </p>
              <h3>{item.quantity}</h3>
              <h3>
                {formatPriceInCents(item.quantity * item.product.priceInCents)}
              </h3>
            </div>
          );
        })}
      </ScrollArea>
      <div>Your total is {formatPriceInCents(total)}</div>
      <Button type="button">Checkout</Button>
    </Card>
  );
};

export default Checkout;
