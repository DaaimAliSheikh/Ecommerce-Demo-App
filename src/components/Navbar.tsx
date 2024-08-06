import { auth } from "@/auth";
import getUserById from "@/lib/getUserById";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Card } from "./ui/card";
import LogoutButton from "./LogoutButton";

const Navbar = async () => {
  const session = await auth();
  const user = await getUserById(session?.user?.id);
  if (!user) return null;
  return (
    <nav className=" my-2 px-1">
      {user.isAdmin ? (
        <Card className="flex justify-between w-full items-center">
          <h2 className="ml-2">Hello, {user.name}</h2>
          
          <div className="border-2 border-foreground rounded-lg">
            <LogoutButton />
          </div>
        </Card>
      ) : (
        <Card className="flex justify-between w-full items-center">
          <h2 className="ml-2">Hello, {user.name}</h2>
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
              <NavigationMenuItem className="border-2 border-foreground rounded-sm">
                <LogoutButton />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Card>
      )}
    </nav>
  );
};

export default Navbar;
