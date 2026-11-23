import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatPrice, menuItems } from "@/features/menu/menuData";

const categories = ["Newest", "Jollof rice", "Amala & ewedu", "Swallow"];

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Newest");
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return menuItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "Newest" || item.category === selectedCategory;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        `${item.name} ${item.description}`.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const toggleFavorite = (itemId: string) => {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(itemId)
        ? currentFavorites.filter((id) => id !== itemId)
        : [...currentFavorites, itemId],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.headerSpacer} />
          <Text style={styles.headerTitle}>Menu</Text>
          <Pressable
            accessibilityLabel="Open orders"
            onPress={() => router.navigate("/(dashboard)/order")}
            style={styles.cartButton}
          >
            <Ionicons name="cart-outline" size={27} color="#555" />
          </Pressable>
        </View>

        <View style={styles.searchBox}>
          <TextInput
            accessibilityLabel="Search menu"
            placeholder="Search Menu"
            placeholderTextColor="#666"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            returnKeyType="search"
          />
          <Ionicons name="search-outline" size={24} color="#AC4B04" />
        </View>

        <View style={styles.featuredCard}>
          <Pressable
            accessibilityLabel="View Ofada Rice details"
            onPress={() =>
              router.push({
                pathname: "../submenu",
                params: { id: "ofada" },
              })
            }
            style={styles.featuredContent}
          >
            <View style={styles.featuredCopy}>
              <Text style={styles.featuredTitle}>Ofada Rice</Text>
              <Text style={styles.featuredDescription}>
                Free when ordering{"\n"}a business lunch
              </Text>
              <View style={styles.featuredPrice}>
                <Text style={styles.featuredPriceText}>
                  {formatPrice(1600)}
                </Text>
              </View>
              <View style={styles.featuredPagination}>
                {[0, 1, 2, 3, 4].map((dot) => (
                  <View key={dot} style={styles.paginationDot} />
                ))}
              </View>
            </View>
            <Image
              source={menuItems.find((item) => item.id === "ofada")!.image}
              style={styles.featuredImage}
            />
          </Pressable>
          <Pressable
            accessibilityLabel="Add Ofada Rice to favorites"
            onPress={() => toggleFavorite("featured-ofada")}
            style={styles.featuredFavorite}
          >
            <Ionicons
              name={
                favorites.includes("featured-ofada")
                  ? "heart"
                  : "heart-outline"
              }
              size={25}
              color="#AC4B04"
            />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {categories.map((category) => {
            const isSelected = selectedCategory === category;

            return (
              <Pressable
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryButton,
                  isSelected && styles.selectedCategoryButton,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isSelected && styles.selectedCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {filteredItems.length > 0 ? (
          <View style={styles.menuGrid}>
            {filteredItems.map((item) => {
              const isFavorite = favorites.includes(item.id);

              return (
                <View key={item.id} style={styles.menuCard}>
                  <Pressable
                    accessibilityLabel={`View ${item.name} details`}
                    onPress={() =>
                      router.push({
                        pathname: "../submenu",
                        params: { id: item.id },
                      })
                    }
                  >
                    <View style={styles.foodImageWrap}>
                      <Image source={item.image} style={styles.foodImage} />
                    </View>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDescription}>
                      {item.description}
                    </Text>
                  </Pressable>
                  <Pressable
                    accessibilityLabel={`${
                      isFavorite ? "Remove" : "Add"
                    } ${item.name} ${isFavorite ? "from" : "to"} favorites`}
                    onPress={() => toggleFavorite(item.id)}
                    style={styles.favoriteButton}
                  >
                    <Ionicons
                      name={isFavorite ? "heart" : "heart-outline"}
                      size={25}
                      color="#AC4B04"
                    />
                  </Pressable>
                  <View style={styles.itemPrice}>
                    <Text style={styles.itemPriceText}>
                      {formatPrice(item.price)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No meals found</Text>
            <Text style={styles.emptyDescription}>
              Try another search or choose a different category.
            </Text>
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
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerSpacer: {
    width: 40,
  },
  headerTitle: {
    color: "#222222",
    fontSize: 21,
    fontWeight: "600",
  },
  cartButton: {
    width: 40,
    alignItems: "flex-end",
  },
  searchBox: {
    height: 43,
    borderWidth: 1,
    borderColor: "#AC4B04",
    borderRadius: 10,
    paddingHorizontal: 13,
    marginTop: 8,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    padding: 0,
    color: "#222222",
    fontSize: 15,
  },
  featuredCard: {
    minHeight: 190,
    borderRadius: 16,
    backgroundColor: "#EAEAEA",
    overflow: "hidden",
    flexDirection: "row",
    marginBottom: 20,
  },
  featuredCopy: {
    flex: 1,
    paddingLeft: 22,
    paddingTop: 12,
    paddingBottom: 14,
    justifyContent: "space-between",
    zIndex: 1,
  },
  featuredContent: {
    flex: 1,
    flexDirection: "row",
  },
  featuredTitle: {
    color: "#AC4B04",
    fontSize: 20,
    fontWeight: "700",
  },
  featuredDescription: {
    color: "#666666",
    fontSize: 15,
    lineHeight: 23,
  },
  featuredPrice: {
    alignSelf: "flex-start",
    backgroundColor: "#AC4B04",
    borderRadius: 9,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  featuredPriceText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  featuredPagination: {
    flexDirection: "row",
    gap: 7,
    marginTop: 3,
  },
  paginationDot: {
    width: 14,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#222222",
  },
  featuredImage: {
    width: "49%",
    height: 180,
    alignSelf: "center",
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    marginRight: -8,
  },
  featuredFavorite: {
    position: "absolute",
    right: 9,
    top: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 4,
  },
  categories: {
    gap: 10,
    paddingBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  selectedCategoryButton: {
    backgroundColor: "#AC4B04",
  },
  categoryText: {
    color: "#AC4B04",
    fontSize: 16,
  },
  selectedCategoryText: {
    color: "#FFFFFF",
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
  },
  menuCard: {
    width: "48%",
    minHeight: 208,
    backgroundColor: "#EAEAEA",
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 40,
    marginBottom: 14,
  },
  foodImageWrap: {
    width: 82,
    height: 82,
    borderRadius: 41,
    overflow: "hidden",
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    marginBottom: 9,
  },
  foodImage: {
    width: "100%",
    height: "100%",
  },
  favoriteButton: {
    position: "absolute",
    right: 9,
    top: 10,
    padding: 2,
  },
  itemName: {
    color: "#AC4B04",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  itemDescription: {
    color: "#666666",
    fontSize: 14,
    lineHeight: 20,
  },
  itemPrice: {
    position: "absolute",
    bottom: -1,
    alignSelf: "center",
    backgroundColor: "#AC4B04",
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  itemPriceText: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyTitle: {
    color: "#222222",
    fontSize: 17,
    fontWeight: "600",
  },
  emptyDescription: {
    color: "#666666",
    fontSize: 14,
    marginTop: 6,
    textAlign: "center",
  },
});
