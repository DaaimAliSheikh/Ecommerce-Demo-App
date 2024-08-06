import { auth } from "@/auth";
import Checkout from "@/components/Checkout";
import getUserById from "@/lib/getUserById";
import { redirect } from "next/navigation";

import React from "react";

const CheckoutPage = async () => {
  const session = await auth();
  const user = await getUserById(session?.user?.id);
  if (!user || user.isAdmin) redirect("/");
  return <Checkout />;
};

export default CheckoutPage;
