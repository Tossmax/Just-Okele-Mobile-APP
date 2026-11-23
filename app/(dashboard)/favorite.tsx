import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import {
  defaultCartOptions,
  formatPrice,
  menuItems,
} from "@/features/menu/menuData";

export default function Favorite() {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const { addItem } = useCart();
  const favoriteItems = menuItems.filter((item) =>
    favoriteIds.includes(item.id),
  );

  const addFavoritesToCart = () => {
    favoriteItems.forEach((item) =>
      addItem(item, 1, defaultCartOptions[item.id] ?? "Meal"),
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Favorites</Text>

        {favoriteItems.length > 0 ? (
          <View style={styles.list}>
            {favoriteItems.map((item) => (
              <View key={item.id} style={styles.mealCard}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`View ${item.name} details`}
                  onPress={() =>
                    router.push({
                      pathname: "/submenu",
                      params: { id: item.id },
                    })
                  }
                  style={styles.mealDetails}
                >
                  <Image source={item.image} style={styles.mealImage} />
                  <View style={styles.mealCopy}>
                    <Text style={styles.mealName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.description} numberOfLines={2}>
                      {item.description}
                    </Text>
                  </View>
                  <Text style={styles.price}>{formatPrice(item.price)}</Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Remove ${item.name} from favorites`}
                  onPress={() => toggleFavorite(item.id)}
                  style={styles.favoriteButton}
                >
                  <Ionicons name="heart" size={16} color="#AC4B04" />
                </Pressable>
              </View>
            ))}
            <Pressable
              accessibilityRole="button"
              onPress={addFavoritesToCart}
              style={styles.addToCartButton}
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="heart-outline" size={34} color="#AC4B04" />
            </View>
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptyDescription}>
              Tap the heart on a meal to save it here.
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.navigate("/(dashboard)/home")}
              style={styles.browseButton}
            >
              <Text style={styles.browseButtonText}>Browse meals</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 35,
    paddingBottom: 100,
  },
  title: {
    color: "#222222",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 7,
    marginBottom: 58,
  },
  list: {
    gap: 38,
  },
  mealCard: {
    height: 121,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 11,
    backgroundColor: "#EAEAEA",
  },
  mealDetails: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },
  mealImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  mealCopy: {
    flex: 1,
    minWidth: 0,
    marginLeft: 6,
    marginRight: 5,
  },
  mealName: {
    color: "#AC4B04",
    fontSize: 15,
    fontWeight: "700",
  },
  description: {
    color: "#666666",
    fontSize: 12,
    lineHeight: 16,
    marginTop: 5,
  },
  price: {
    width: 98,
    color: "#111111",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "right",
    marginRight: 1,
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 7,
    padding: 2,
  },
  addToCartButton: {
    height: 49,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
    backgroundColor: "#AC4B04",
    marginTop: 25,
  },
  addToCartText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "500",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  emptyIcon: {
    width: 72,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 36,
    backgroundColor: "#F8EDE5",
  },
  emptyTitle: {
    color: "#222222",
    fontSize: 19,
    fontWeight: "700",
    marginTop: 18,
  },
  emptyDescription: {
    color: "#777777",
    fontSize: 14,
    textAlign: "center",
    marginTop: 7,
  },
  browseButton: {
    marginTop: 20,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#AC4B04",
  },
  browseButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
