"use server";
import { db } from "@/db/db";

const getAnyByEmailWithPassword = async (email: string) => {
  return await db.user.findUnique({
    where: { email },
  });
};

export default getAnyByEmailWithPassword;
