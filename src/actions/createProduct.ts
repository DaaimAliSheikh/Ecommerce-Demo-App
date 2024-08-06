"use server";

import { db } from "@/db/db";
import imagekit from "@/lib/imagekit";

const createProduct = async (formData: FormData) => {
  const value = formData.get("image") as File;
  const { filePath } = await imagekit.upload({
    file: Buffer.from(await value.arrayBuffer()),
    fileName: value.name + Date.now() + Math.random() * 100,
    folder: `/ecom/`,
  });
  return await db.product.create({
    data: {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      priceInCents: Number(formData.get("priceInCents")),
      stock: Number(formData.get("stock")),
      image: filePath,
    },
  });
};

export default createProduct;
