import getProducts from "@/actions/getProducts";
import { auth } from "@/auth";
import AddProductCard from "@/components/AddProductCard";
import Cart from "@/components/Cart";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import getUserById from "@/lib/getUserById";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const HomePage = async () => {
  const session = await auth();
  const user = await getUserById(session?.user?.id);
  if (!user) return null;
  const products = await getProducts();

  return (
    <div className="flex flex-col ">
      {user.isAdmin ? (
        <h1 className="p-2 w-full text-2xl">This is your Admin Dashboard</h1>
      ) : null}
      <section className="px-1 grid md:grid-cols-4 gap-2 grid-cols-2  ">
        {products.map((product) => {
          return (
            <ProductCard
              isAdmin={user.isAdmin}
              key={product.id}
              product={product}
            />
          );
        })}
        {user.isAdmin && <AddProductCard />}
      </section>
      {user.isAdmin || <Cart products={products} />}
    </div>
  );
};

export default HomePage;
