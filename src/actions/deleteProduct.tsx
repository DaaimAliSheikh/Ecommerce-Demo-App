"use server";

import { db } from "@/db/db";
import imagekit from "@/lib/imagekit";

const deleteProduct = async (id: string) => {
  const product = await db.product.delete({
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
};

export default deleteProduct;
