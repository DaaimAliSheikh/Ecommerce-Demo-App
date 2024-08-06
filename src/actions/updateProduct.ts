"use server";

import { db } from "@/db/db";
import imagekit from "@/lib/imagekit";

const updateProduct = async (formData: FormData, id: string) => {
  const value = formData.get("image") as File;
  if (value) {
    const product = await db.product.findUnique({
      where: { id },
      select: { image: true },
    });
    if (product?.image) {
      const files = await imagekit.listFiles({ path: "/ecom/" });
      const fileId = files.find((f) => {
        return f.filePath === product?.image;
      })?.fileId as string;
      await imagekit.deleteFile(fileId);
    }

    const { filePath } = await imagekit.upload({
      file: Buffer.from(await value.arrayBuffer()),
      fileName: value.name + Date.now() + Math.random() * 100,
      folder: `/ecom/`,
    });
    return await db.product.update({
      where: { id },
      data: {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        priceInCents: Number(formData.get("priceInCents")),
        stock: Number(formData.get("stock")),
        image: filePath,
      },
    });
  }
  return await db.product.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      priceInCents: Number(formData.get("priceInCents")),
      stock: Number(formData.get("stock")),
    },
  });
};

export default updateProduct;
