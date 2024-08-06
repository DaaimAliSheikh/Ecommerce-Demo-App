import { db } from "@/db/db";

const getUserByEmailWithPassword = async (email: string) => {
  return await db.user.findUnique({
    where: { email, isAdmin: false },
  });
};

export default getUserByEmailWithPassword;
