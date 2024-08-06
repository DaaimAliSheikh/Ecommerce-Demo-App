import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { useDropzone } from "react-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import updateProduct from "@/actions/updateProduct";
import createProduct from "@/actions/createProduct";
import { useRouter } from "next/navigation";

const ProductSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  priceInCents: z.coerce.number().gt(0, { message: "Invalid Price" }),
  stock: z.coerce.number().gt(0, { message: "Invalid Stock" }),
  image: z.any().optional(),
});

type ProductFormType = z.infer<typeof ProductSchema>;

const ProductForm = ({
  setOpen,
  product,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product?: Product;
}) => {
  const router = useRouter();
  const form = useForm<ProductFormType>({
    shouldUnregister: false,
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      priceInCents: product?.priceInCents || 0,
      stock: product?.stock || 0,
      image: [],
    },
  });

  useEffect(() => {
    form.register("image");
    return () => {
      form.unregister("image");
    };
  }, [form.register, form.unregister]);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/png": [".png"],
        "image/jpeg": [".jpeg", ".jpg"],
        "image/gif": [".gif"],
        "image/webp": [".webp"],
      },
      maxFiles: 1,
      onDrop: (acceptedFiles) => {
        form.setValue("image", acceptedFiles, { shouldValidate: true });
      },
    });

  const removeFile = (file: File) => () => {
    acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
    form.setValue("image", acceptedFiles, { shouldValidate: true });
  };

  const onSubmit = async (data: ProductFormType) => {
    console.log(data);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "image" && value) {
        (value as File[]).forEach((file: File) => {
          formData.append("image", file);
        });
      } else {
        formData.append(key, value as string);
      }
    });
    try {
      if (product) await updateProduct(formData, product.id);
      else await createProduct(formData);
    } catch {
      console.log("something went wrong");
    }
    setOpen(false);
    router.refresh();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 pr-3 flex flex-col text-left"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product name</FormLabel>
              <FormControl>
                <Input placeholder="chair..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="cool chair..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priceInCents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price in cents</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div
          {...getRootProps({
            className:
              "dropzone w-full border-dashed border text-center p-10 flex justify-center items-center hover:cursor-pointer hover:bg-secondary hover:border-foreground",
          })}
        >
          {product
            ? "Add new picture if you wish to replace the current one(optional)"
            : "Add picture"}
          <input id="image" {...getInputProps()} />
        </div>
        {fileRejections.length > 1 ? (
          <p className="text-red-500">Too many files</p>
        ) : (
          fileRejections.map(({ file, errors }) => {
            return (
              <li key={file.name}>
                <p className="text-red-500">{file.name}</p>
                <ul>
                  {errors.map((e) => (
                    <li className="text-red-500 ml-2" key={e.code}>
                      {e.message}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })
        )}
        <p>selected file:</p>
        <ul className="mx-auto">
          {acceptedFiles.map((file) => {
            return (
              <li key={file.name}>
                <div className="relative">
                  <img
                    className="w-[5rem] h-[5rem] object-cover"
                    src={URL.createObjectURL(file)}
                  />
                  <button
                    type="button"
                    onClick={removeFile(file)}
                    className="absolute top-0 right-0  p-2 hover:cursor-pointer bg-black"
                  >
                    x
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <Button
          disabled={form.formState.isSubmitting}
          className=" w-full text-foreground"
          type="submit"
        >
          {product ? "Save changes" : "Add product"}
          {form.formState.isSubmitting ? (
            <LoaderCircle className="animate-spin ml-2" />
          ) : null}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
