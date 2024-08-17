import AuthForm from "@/components/AuthForm";
import React from "react";
import { Righteous } from "next/font/google";

const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
});

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const svgLogo = (
  <svg
    className="w-10 h-10"
    viewBox="0 0 62 74"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.2998 73.2001V11.6001L61.5998 42.4001L8.2998 73.2001ZM11.3998 17.1001V67.8001L55.2998 42.4001L11.3998 17.1001Z"
      fill="#9D9D9D"
    />
    <path
      className="fill-primary"
      d="M0 61.5V0L53.3 30.8L0 61.5ZM3.09999 5.29999V56L47 30.6L3.09999 5.29999Z"
      fill="currentColor"
    />
    <path
      className="fill-primary"
      d="M0 61.5V0L53.3 30.8L0 61.5ZM3.09999 5.29999V56L47 30.6L3.09999 5.29999Z"
      fill-opacity="0.2"
    />
  </svg>
);

const Signin = async () => {
  return (
    <div className="flex flex-col justify-center h-[100svh] items-center   ">
      <h1
        className={
          righteous.className +
          " my-2 text-4xl flex gap-2  bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent"
        }
      >
        DealDeck
        {svgLogo}
      </h1>

      <p className="text-muted-foreground">Your Deck of Mobile Deals</p>
      <AuthForm />
    </div>
  );
};

export default Signin;
