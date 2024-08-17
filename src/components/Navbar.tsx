import { auth } from "@/auth";
import getUserById from "@/lib/getUserById";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Card } from "./ui/card";
import LogoutButton from "./LogoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Righteous } from "next/font/google";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import NavbarDropdownContent from "./NavbarDropdownContent";

const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
});

const svgLogo = (
  <svg
    className="w-8 h-8"
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

const Navbar = async () => {
  const session = await auth();
  const user = await getUserById(session?.user?.id);
  const { theme, setTheme } = useTheme();
  if (!user) return null;
  return (
    <nav className=" px-1">
      <Card className="flex border-none shadow-none justify-between w-full items-center">
        <h1
          className={
            righteous.className +
            " my-2 text-2xl flex gap-2  bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent"
          }
        >
          DealDeck
          {svgLogo}
        </h1>
        <NavigationMenu className=" flex p-2 justify-center h-fit">
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Products
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/checkout" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Checkout
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem></NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
         <NavbarDropdownContent/>
       
        </DropdownMenu>
      </Card>
    </nav>
  );
};

export default Navbar;
