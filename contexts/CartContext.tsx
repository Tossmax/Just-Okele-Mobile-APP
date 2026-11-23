import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type { MenuItem } from "@/features/menu/menuData";

export type CartItem = {
  key: string;
  menuItem: MenuItem;
  quantity: number;
  soup: string;
};

type CartContextValue = {
  items: CartItem[];
  total: number;
  addItem: (menuItem: MenuItem, quantity: number, soup: string) => void;
  setItemQuantity: (
    menuItem: MenuItem,
    quantity: number,
    soup: string,
  ) => void;
  getItemQuantity: (menuItemId: string, soup: string) => number;
  removeItem: (key: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (menuItem: MenuItem, quantity: number, soup: string) => {
    const key = `${menuItem.id}:${soup}`;

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.key === key);

      if (existingItem) {
        return currentItems.map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...currentItems, { key, menuItem, quantity, soup }];
    });
  };

  const setItemQuantity = (
    menuItem: MenuItem,
    quantity: number,
    soup: string,
  ) => {
    const key = `${menuItem.id}:${soup}`;

    setItems((currentItems) => {
      const existingItem = currentItems.some((item) => item.key === key);

      if (quantity <= 0) {
        return currentItems.filter((item) => item.key !== key);
      }

      if (existingItem) {
        return currentItems.map((item) =>
          item.key === key ? { ...item, quantity } : item,
        );
      }

      return [...currentItems, { key, menuItem, quantity, soup }];
    });
  };

  const getItemQuantity = (menuItemId: string, soup: string) =>
    items.find((item) => item.key === `${menuItemId}:${soup}`)?.quantity ?? 0;

  const removeItem = (key: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.key !== key));
  };

  const total = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.menuItem.price * item.quantity,
        0,
      ),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        addItem,
        setItemQuantity,
        getItemQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
