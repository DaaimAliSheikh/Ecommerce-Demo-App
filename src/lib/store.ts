import { Product } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  updateQuantity: (productId: string, change: number) => void; ///change is either 1 or -1
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  validateItems: (dbItems: string[]) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // Add product to cart
      addToCart: (product, quantity) => {
        const existingCartItem = get().items.find(
          (item) => item.product.id === product.id
        );

        if (existingCartItem) {
          // Update the quantity if the product already exists in the cart
          set({
            items: get().items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          // Add the product to the cart if it doesn't exist
          set({
            items: [...get().items, { product, quantity }],
          });
        }
      },

      // Update the quantity of a product in the cart
      updateQuantity: (productId, change) => {
        set({
          items: get().items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + change }
              : item
          ),
        });
      },

      removeFromCart: (productId) => {
        set({
          items: get().items.filter((item) => item.product.id !== productId),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      validateItems: (dbItems: string[]) => {
        set({
          items: get().items.filter((item) =>
            dbItems.includes(item.product.id)
          ),
        });
      },
    }),
    {
      name: "cart-storage", // Name of the storage item in localStorage
      partialize: (state) => ({ items: state.items }), // Only persist the items array
    }
  )
);
