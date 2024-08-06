"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import ProductForm from "./ProductForm";

const AddProductCard = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Product</Button>
      </DialogTrigger>
      <DialogContent className="h-[70vh] overflow-hidden">
        <ScrollArea>
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
          </DialogHeader>
          <ProductForm setOpen={setOpen} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductCard;
