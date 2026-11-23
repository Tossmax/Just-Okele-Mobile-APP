import type { ImageSourcePropType } from "react-native";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: ImageSourcePropType;
};

export const menuItems: MenuItem[] = [
  {
    id: "amala",
    name: "Amala",
    description: "Amala and Ewedu Soup with meats",
    price: 3500,
    category: "Amala&ewedu",
    image: require("../../assets/images/onb4.jpg"),
  },
  {
    id: "eba",
    name: "Eba",
    description: "Eba with Egusi Soup and assorted meat",
    price: 2800,
    category: "Eba & Egusi",
    image: require("../../assets/images/onb3.jpg"),
  },
  {
    id: "ofada",
    name: "Ofada Rice",
    description: "Ofada Rice with Fish, Plantain, Egg and Beef",
    price: 1600,
    category: "Jollof rice",
    image: require("../../assets/images/onb3.jpg"),
  },
  {
    id: "jollof",
    name: "Party Jollof",
    description: "Smoky jollof rice with grilled chicken",
    price: 2000,
    category: "Jollof rice",
    image: require("../../assets/images/onb4.jpg"),
  },
];

export const defaultCartOptions: Record<string, string> = {
  amala: "Gbegiri",
  eba: "Egusi",
  ofada: "Fish",
  jollof: "Chicken",
};

export function formatPrice(price: number) {
  return `₦${price.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
