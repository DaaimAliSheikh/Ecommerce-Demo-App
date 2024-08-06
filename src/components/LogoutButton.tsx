"use client";
import React from "react";
import { Button } from "./ui/button";
import { logoutAction } from "@/actions/auth_actions";
import { Power } from "lucide-react";

const LogoutButton = () => {
  return (
    <Button
      variant={"ghost"}
      onClick={async () => {
        localStorage.removeItem("cart-storage");
        await logoutAction();
        window.location.href = "/signin";
      }}
    >
      <Power className="text-primary mr-2" />
      <p>Logout</p>
    </Button>
  );
};

export default LogoutButton;
