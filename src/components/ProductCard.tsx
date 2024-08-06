"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Product } from "@prisma/client";
import formatPriceInCents from "@/lib/formatPriceInCents";
import { useCartStore } from "@/lib/store";
import { Button } from "./ui/button";
import ProductForm from "./ProductForm";
import { ScrollArea } from "./ui/scroll-area";
import { useRouter } from "next/navigation";
import deleteProduct from "@/actions/deleteProduct";
import DeleteButton from "./DeleteButton";

const ProductCard = ({
  product,
  isAdmin,
}: {
  product: Product;
  isAdmin: boolean;
}) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [open, setOpen] = React.useState(false);

  const router = useRouter();


  return (
    <Card
      onClick={() => {
        if (!isAdmin) addToCart(product, 1);
      }}
      className="hover:bg-secondary relative hover:cursor-pointer"
    >
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>

        <CardDescription>
          {formatPriceInCents(product.priceInCents)}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex justify-between">
          <p>{product.description}</p>
          <p className="whitespace-nowrap">stock: {product.stock}</p>
        </div>
        <Image
          className="w-full object-cover"
          src={product.image || ""}
          alt="product image"
          width={100}
          height={100}
        ></Image>
      </CardContent>
      {isAdmin && (
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="absolute top-0 right-0 m-2">Edit</Button>
            </DialogTrigger>
            <DialogContent className="h-[70vh] overflow-hidden">
              <ScrollArea>
                <DialogHeader>
                  <DialogTitle>Edit Product</DialogTitle>
                </DialogHeader>
                <ProductForm product={product} setOpen={setOpen} />
              </ScrollArea>
            </DialogContent>
          </Dialog>
          <form
            action={async () => {
              await deleteProduct(product.id);
              router.refresh();
            }}
          >
            <DeleteButton />
          </form>
        </>
      )}
    </Card>
  );
};

export default ProductCard;
