import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CartIconButton from "@/components/CartIconButton";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import {
  defaultCartOptions,
  formatPrice,
  menuItems,
} from "@/features/menu/menuData";

const horizontalPadding = 35;
const categories = [
  "Newest",
  "Jollof rice",
  "Amala&ewedu",
  "Eba & Egusi",
];
const featuredMeals = [
  { id: "eba", title: "Eba & Egusi" },
  { id: "ofada", title: "Ofada Rice" },
  { id: "amala", title: "Amala & Ewedu" },
  { id: "jollof", title: "Party Jollof" },
].flatMap((featured) => {
  const meal = menuItems.find((item) => item.id === featured.id);
  return meal ? [{ ...featured, meal }] : [];
});

export default function Home() {
  const { width: screenWidth } = useWindowDimensions();
  const bannerListRef = useRef<FlatList<(typeof featuredMeals)[number]>>(null);
  const [activeBanner, setActiveBanner] = useState(0);
  const [bannerHeights, setBannerHeights] = useState<Record<string, number>>(
    {},
  );
  const [search, setSearch] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Newest");
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const activeBannerId = featuredMeals[activeBanner]?.id;
  const bannerHeight = activeBannerId
    ? (bannerHeights[activeBannerId] ?? 192)
    : 192;

  const filteredItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return menuItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "Newest" || item.category === selectedCategory;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        `${item.name} ${item.description}`
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const menuRows = useMemo(() => {
    const rows: (typeof menuItems)[] = [];

    for (let index = 0; index < filteredItems.length; index += 2) {
      rows.push(filteredItems.slice(index, index + 2));
    }

    return rows;
  }, [filteredItems]);

  const handleBannerScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / screenWidth,
    );
    setActiveBanner(Math.min(index, featuredMeals.length - 1));
  };

  const measureBanner = (itemId: string, height: number) => {
    const measuredHeight = Math.ceil(height);
    setBannerHeights((currentHeights) =>
      currentHeights[itemId] === measuredHeight
        ? currentHeights
        : { ...currentHeights, [itemId]: measuredHeight },
    );
  };

  const openMeal = (itemId: string) => {
    router.push({
      pathname: "/submenu",
      params: { id: itemId },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>Hi, Tossmax</Text>
          <CartIconButton />
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Popular Meals</Text>
          <Pressable
            accessibilityLabel={searchVisible ? "Close search" : "Search menu"}
            onPress={() => {
              setSearchVisible((visible) => !visible);
              setSearch("");
            }}
            style={styles.searchToggle}
          >
            <Ionicons
              name={searchVisible ? "close" : "search"}
              size={19}
              color="#AC4B04"
            />
          </Pressable>
        </View>

        {searchVisible && (
          <View style={styles.searchBox}>
            <TextInput
              autoFocus
              accessibilityLabel="Search meals"
              placeholder="Search Menu"
              placeholderTextColor="#777777"
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
              returnKeyType="search"
            />
            <Ionicons name="search-outline" size={21} color="#AC4B04" />
          </View>
        )}

        <FlatList
          ref={bannerListRef}
          data={featuredMeals}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          onMomentumScrollEnd={handleBannerScroll}
          getItemLayout={(_, index) => ({
            length: screenWidth,
            offset: screenWidth * index,
            index,
          })}
          style={[
            styles.bannerList,
            { width: screenWidth, height: bannerHeight },
          ]}
          renderItem={({ item }) => (
            <View
              style={{
                width: screenWidth,
                paddingHorizontal: horizontalPadding,
              }}
            >
              <View
                onLayout={({ nativeEvent }) =>
                  measureBanner(item.id, nativeEvent.layout.height)
                }
                style={styles.bannerCard}
              >
                <View style={styles.bannerCopy}>
                  <Text style={styles.bannerTitle}>{item.title}</Text>
                  <Text style={styles.bannerDescription}>
                    Free when ordering{"\n"}a business lunch
                  </Text>
                  <Pressable
                    accessibilityLabel={`Order ${item.meal.name}`}
                    onPress={() => openMeal(item.meal.id)}
                    style={styles.orderNowButton}
                  >
                    <Text style={styles.orderNowText}>Order Now</Text>
                  </Pressable>
                  <View style={styles.pagination}>
                    {featuredMeals.map((meal, index) => (
                      <View
                        key={meal.id}
                        style={[
                          styles.paginationDash,
                          activeBanner === index && styles.activeDash,
                        ]}
                      />
                    ))}
                  </View>
                </View>
                <Pressable
                  accessibilityLabel={`View ${item.meal.name}`}
                  onPress={() => openMeal(item.meal.id)}
                  style={styles.bannerImageFrame}
                >
                  <Image source={item.meal.image} style={styles.bannerImage} />
                </Pressable>
              </View>
            </View>
          )}
        />

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

        {menuRows.length > 0 ? (
          <ScrollView
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.menuGridScroller}
          >
            <View style={styles.menuRows}>
              {menuRows.map((row, rowIndex) => (
                <View key={`row-${rowIndex}`} style={styles.menuRow}>
                  {row.map((item) => {
                    const itemIsFavorite = isFavorite(item.id);

                    return (
                      <View key={item.id} style={styles.menuCard}>
                        <Pressable
                          accessibilityRole="button"
                          accessibilityLabel={`View ${item.name} details`}
                          onPress={() => openMeal(item.id)}
                          style={styles.mealDetails}
                        >
                          <View style={styles.foodImageWrap}>
                            <Image
                              source={item.image}
                              style={styles.foodImage}
                            />
                          </View>
                          <View style={styles.itemHeading}>
                            <Text
                              style={styles.itemName}
                              numberOfLines={1}
                            >
                              {item.name}
                            </Text>
                            <View style={styles.rating}>
                              <Ionicons
                                name="star-outline"
                                size={13}
                                color="#AC4B04"
                              />
                              <Text style={styles.ratingText}>4.5</Text>
                            </View>
                          </View>
                          <Text
                            style={styles.itemDescription}
                            numberOfLines={2}
                          >
                            {item.description}
                          </Text>
                        </Pressable>
                        <Pressable
                          accessibilityRole="button"
                          accessibilityLabel={`${
                            itemIsFavorite ? "Remove" : "Add"
                          } ${item.name} ${itemIsFavorite ? "from" : "to"} favorites`}
                          onPress={() => toggleFavorite(item.id)}
                          style={styles.favoriteButton}
                        >
                          <Ionicons
                            name={itemIsFavorite ? "heart" : "heart-outline"}
                            size={26}
                            color="#AC4B04"
                          />
                        </Pressable>
                        <Text style={styles.itemPrice}>
                          {formatPrice(item.price)}
                        </Text>
                        <Pressable
                          accessibilityLabel={`Add ${item.name} to cart`}
                          onPress={() =>
                            addItem(
                              item,
                              1,
                              defaultCartOptions[item.id] ?? "Meal",
                            )
                          }
                          style={styles.addToCartButton}
                        >
                          <Ionicons
                            name="cart-outline"
                            size={17}
                            color="#FFFFFF"
                          />
                        </Pressable>
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          </ScrollView>
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
    paddingHorizontal: horizontalPadding,
    paddingBottom: 28,
  },
  header: {
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greeting: {
    color: "#222222",
    fontSize: 20,
    fontWeight: "600",
  },
  sectionHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  sectionTitle: {
    color: "#222222",
    fontSize: 19,
  },
  searchToggle: {
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBox: {
    height: 42,
    borderWidth: 1,
    borderColor: "#AC4B04",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginTop: -12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    padding: 0,
    color: "#222222",
    fontSize: 15,
  },
  bannerList: {
    marginHorizontal: -horizontalPadding,
    marginBottom: 35,
  },
  bannerCard: {
    borderRadius: 16,
    backgroundColor: "#EAEAEA",
    overflow: "visible",
    flexDirection: "row",
  },
  bannerCopy: {
    flex: 1,
    paddingLeft: 27,
    paddingTop: 12,
    paddingBottom: 5,
    justifyContent: "flex-start",
    zIndex: 1,
  },
  bannerTitle: {
    color: "#222222",
    fontSize: 19,
    lineHeight: 23,
    fontWeight: "700",
    marginBottom: 4,
  },
  bannerDescription: {
    color: "#666666",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 14,
  },
  orderNowButton: {
    width: 129,
    height: 48,
    backgroundColor: "#AC4B04",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  orderNowText: {
    color: "#FFFFFF",
    fontSize: 17,
    lineHeight: 21,
  },
  pagination: {
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
    height: 20,
    marginTop: 14,
    marginBottom: 8,
  },
  paginationDash: {
    width: 14,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#555555",
  },
  activeDash: {
    backgroundColor: "#171717",
  },
  bannerImageFrame: {
    width: 180,
    height: 180,
    alignSelf: "center",
    marginRight: -19,
    borderRadius: 90,
    borderWidth: 5,
    borderColor: "#FFFFFF",
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  categories: {
    gap: 9,
    paddingBottom: 16,
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: "#888888",
    borderRadius: 15,
    paddingHorizontal: 11,
    paddingVertical: 7,
    backgroundColor: "#FFFFFF",
  },
  selectedCategoryButton: {
    backgroundColor: "#AC4B04",
    borderColor: "#AC4B04",
  },
  categoryText: {
    color: "#222222",
    fontSize: 15,
  },
  selectedCategoryText: {
    color: "#FFFFFF",
  },
  menuGridScroller: {
    paddingRight: horizontalPadding,
  },
  menuRows: {
    gap: 30,
  },
  menuRow: {
    flexDirection: "row",
    gap: 36,
  },
  menuCard: {
    width: 216,
    height: 262,
    paddingHorizontal: 12,
    paddingTop: 10,
    borderRadius: 15,
    backgroundColor: "#EAEAEA",
  },
  mealDetails: {
    flex: 1,
  },
  foodImageWrap: {
    width: 98,
    height: 98,
    borderRadius: 49,
    overflow: "hidden",
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    marginBottom: 10,
  },
  foodImage: {
    width: "100%",
    height: "100%",
  },
  itemHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
  },
  itemName: {
    flex: 1,
    color: "#AC4B04",
    fontSize: 17,
    fontWeight: "700",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  ratingText: {
    color: "#222222",
    fontSize: 12,
  },
  itemDescription: {
    color: "#666666",
    fontSize: 13,
    lineHeight: 17,
    marginTop: 5,
  },
  favoriteButton: {
    position: "absolute",
    right: 8,
    top: 10,
    padding: 2,
  },
  itemPrice: {
    position: "absolute",
    left: 12,
    bottom: 17,
    color: "#111111",
    fontSize: 17,
    fontWeight: "700",
  },
  addToCartButton: {
    position: "absolute",
    right: 12,
    bottom: 12,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: "#AC4B04",
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
