"use client";
import React, { useEffect } from "react";
import { Card } from "./ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartStore } from "@/lib/store";
import { Button } from "./ui/button";
import { Product } from "@prisma/client";

const Cart = ({ products }: { products: Product[] }) => {
  const { items, updateQuantity, clearCart, removeFromCart, validateItems } =
    useCartStore((state) => ({
      items: state.items,
      updateQuantity: state.updateQuantity,
      clearCart: state.clearCart,
      removeFromCart: state.removeFromCart,
      validateItems: state.validateItems,
    }));

  useEffect(() => {
    const dbItems = products.map((product) => product.id);
    validateItems(dbItems);
  }, []);
  return (
    <Card className="w-full m-2 mx-auto  ">
      <div className="flex justify-between p-2">
        <h2 className="text-xl mt-2 ml-2">Cart Items</h2>
        <Button onClick={() => clearCart()}>Clear cart</Button>
        <h2 className="text-xl mt-2 mr-2">quantity</h2>
      </div>
      <ScrollArea className="w-full h-[25vh] rounded-md border p-4">
        {items.map((item) => {
          return (
            <div
              key={item.product.id}
              className="flex justify-between items-center mb-2"
            >
              <h3>{item.product.name}</h3>
              <div className="flex items-center gap-1">
                <Button
                  onClick={() => {
                    if (item.quantity > 1)
                      updateQuantity(
                        item.product.id,
                        item.quantity > 0 ? -1 : 0
                      );
                    else removeFromCart(item.product.id);
                  }}
                  size={"icon"}
                >
                  -
                </Button>
                <h3>{item.quantity}</h3>
                <Button
                  size={"icon"}
                  onClick={() => updateQuantity(item.product.id, 1)}
                >
                  +
                </Button>
              </div>
            </div>
          );
        })}
      </ScrollArea>
    </Card>
  );
};

export default Cart;
