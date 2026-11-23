import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useCart } from "@/contexts/CartContext";

type CartIconButtonProps = {
  color?: string;
};

export default function CartIconButton({
  color = "#555555",
}: CartIconButtonProps) {
  const { items } = useCart();
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open cart, ${itemCount} ${
        itemCount === 1 ? "item" : "items"
      }`}
      onPress={() => router.navigate("/(dashboard)/order")}
      style={styles.button}
    >
      <View style={styles.iconWrap}>
        <Ionicons name="cart-outline" size={27} color={color} />
        {itemCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {itemCount > 99 ? "99+" : itemCount}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 35,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrap: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -7,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: "#AC4B04",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
});
