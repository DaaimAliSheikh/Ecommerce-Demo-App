"use client";
import React from "react";
import { DropdownMenuContent, DropdownMenuLabel } from "./ui/dropdown-menu";
import LogoutButton from "./LogoutButton";
import { useTheme } from "next-themes";

const NavbarDropdownContent = () => {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenuContent>
      <DropdownMenuLabel>
        <div>
          {user.name}

          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LogoutButton />
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
      >
        <div>
          {theme == "dark" ? (
            <Moon className="text-primary mr-4" />
          ) : (
            <Sun className="text-primary mr-4" />
          )}

          <p>Mode: {theme}</p>
        </div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default NavbarDropdownContent;
