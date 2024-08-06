import { cache } from "react";
import { db } from "../db/db";

///caceh the action so that if multiple components call this on 1 request, then it will only be called once and result passed to all those components
const getUserById = cache(async (id: string | undefined) => {
  if (id)
    return await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        isAdmin: true,
        emailVerified: true,
      },
    });
});

export default getUserById;
