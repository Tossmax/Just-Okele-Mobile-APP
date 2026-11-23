import { Ionicons } from "@expo/vector-icons";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/features/menu/menuData";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Order() {
  const { items, total, removeItem } = useCart();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>My Cart</Text>
      </View>
      {items.length > 0 ? (
        <>
          <ScrollView contentContainerStyle={styles.list}>
            {items.map((cartItem) => (
              <View key={cartItem.key} style={styles.cartItem}>
                <Image
                  source={cartItem.menuItem.image}
                  style={styles.image}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>
                    {cartItem.menuItem.name}
                  </Text>
                  <Text style={styles.itemOption}>
                    {cartItem.quantity} × {cartItem.soup}
                  </Text>
                  <Text style={styles.itemPrice}>
                    {formatPrice(cartItem.menuItem.price * cartItem.quantity)}
                  </Text>
                </View>
                <Pressable
                  accessibilityLabel={`Remove ${cartItem.menuItem.name} from cart`}
                  onPress={() => removeItem(cartItem.key)}
                  style={styles.removeButton}
                >
                  <Ionicons name="trash-outline" size={20} color="#AC4B04" />
                </Pressable>
              </View>
            ))}
          </ScrollView>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatPrice(total)}</Text>
          </View>
        </>
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="cart-outline" size={42} color="#AC4B04" />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyDescription}>
            Choose a meal from the menu to get started.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    height: 58,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#222222",
    fontSize: 21,
    fontWeight: "600",
  },
  list: {
    padding: 18,
    gap: 14,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 14,
    backgroundColor: "#F1F1F1",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    color: "#222222",
    fontSize: 16,
    fontWeight: "600",
  },
  itemOption: {
    color: "#666666",
    fontSize: 13,
    marginTop: 3,
  },
  itemPrice: {
    color: "#AC4B04",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 5,
  },
  removeButton: {
    padding: 8,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#DDDDDD",
  },
  totalLabel: {
    color: "#222222",
    fontSize: 18,
    fontWeight: "600",
  },
  totalValue: {
    color: "#AC4B04",
    fontSize: 18,
    fontWeight: "700",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  emptyTitle: {
    color: "#222222",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 14,
  },
  emptyDescription: {
    color: "#666666",
    fontSize: 14,
    textAlign: "center",
    marginTop: 6,
  },
});
