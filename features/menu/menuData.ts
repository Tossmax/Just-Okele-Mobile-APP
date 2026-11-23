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
    price: 1500,
    category: "Amala & ewedu",
    image: require("../../assets/images/onb4.jpg"),
  },
  {
    id: "eba",
    name: "Eba",
    description: "Eba with Egusi soup and assorted meat",
    price: 1500,
    category: "Swallow",
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

export function formatPrice(price: number) {
  return `₦${price.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
