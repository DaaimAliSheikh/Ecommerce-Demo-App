"use server";
import { signIn, signOut } from "@/auth";

import { db } from "@/db/db";
import { LoginFormSchema, LoginFormType } from "@/lib/LoginFormSchema";
import { RegisterFormSchema, RegisterFormType } from "@/lib/RegisterFormSchema";
import bcrypt from "bcryptjs";
import getUserByEmailWithPassword from "@/lib/getUserByEmailWithPassword";
import getAdminByEmailWithPassword from "@/lib/getAdminByEmailWithPassword";

export const registerAction = async (data: RegisterFormType) => {
  const result = RegisterFormSchema.safeParse(data);

  if (result.error) {
    return { error: result.error.message };
  }

  if (result.success) {
    try {
      const user = await getUserByEmailWithPassword(result.data.email);
      if (user) {
        return { error: "Email already Registered" };
      }

      await db.user.create({
        data: {
          name: result.data.username,
          email: result.data.email,
          emailVerified: new Date(),
          password: await bcrypt.hash(result.data.password, 10),
        },
      });
      await signIn("credentials", {
        email: result.data.email,
        password: result.data.password,
        redirect: false,
      });
      return { success: true };
    } catch (e) {
      console.log(e);
    }
    return { error: "Something went Wrong" };
  }
};

export const loginAction = async (data: LoginFormType) => {
  const result = LoginFormSchema.safeParse(data);

  if (result.error) return { error: result.error.message };

  if (result.success) {
    try {
      const user = await getUserByEmailWithPassword(result.data.email);

      if (
        !user ||
        !user.password ||
        !(await bcrypt.compare(result.data.password, user.password))
      )
        return { error: "Invalid Credentials" };

      await signIn("credentials", {
        email: result.data.email,
        password: result.data.password,
        isAdmin: false,
        redirect: false,
      });
      return { success: true };
    } catch (e) {
      console.log(e);
      return { error: "Something went Wrong" };
    }
  }
};

export const adminLoginAction = async (data: LoginFormType) => {
  const result = LoginFormSchema.safeParse(data);

  if (result.error) return { error: result.error.message };

  if (result.success) {
    try {
      const user = await getAdminByEmailWithPassword(result.data.email);

      if (
        !user ||
        !user.password ||
        !(await bcrypt.compare(result.data.password, user.password))
      )
        return { error: "Invalid Credentials" };

      await signIn("credentials", {
        email: result.data.email,
        password: result.data.password,
        isAdmin: true,
        redirect: false,
      });
      return { success: true };
    } catch (e) {
      console.log("Something went Wrong");
      return { error: "Something went Wrong" };
    }
  }
};
export const logoutAction = async () => {
  try {
    await signOut({ redirect: false });
  } catch (e) {
    console.log(e);
    return { error: "Could not log out, something went Wrong" };
  }
};
