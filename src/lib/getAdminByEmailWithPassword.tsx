import { db } from "@/db/db";

const getAdminByEmailWithPassword = async (email: string) => {
  return await db.user.findUnique({
    where: { email, isAdmin: true },
  });
};

export default getAdminByEmailWithPassword;
