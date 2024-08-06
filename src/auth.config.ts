import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { LoginFormSchema } from "./lib/LoginFormSchema";
import bcrypt from "bcryptjs";
import getAnyByEmailWithPassword from './lib/import { db } from "@/db/getAnyByEmailWithPassword';
export default {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;
        const result = LoginFormSchema.safeParse({ email, password });

        if (result.success) {
          let user = await getAnyByEmailWithPassword(email as string);

          if (
            !user ||
            !user?.password ||
            !(await bcrypt.compare(result.data.password, user?.password))
          )
            return null;
          return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
