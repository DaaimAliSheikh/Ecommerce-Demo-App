"use server";

import { db } from "@/db/db";

const getProducts = async () => {
  return await db.product.findMany();
};

export default getProducts;
