import { auth } from "@/auth";
import AuthForm from "@/components/AuthForm";
import getUserById from "@/lib/getUserById";
import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Signin = async () => {
  const session = await auth();
  const user = await getUserById(session?.user?.id);
  return (
    <div className="flex flex-col items-center   ">
      <AuthForm />
    </div>
  );
};

export default Signin;
