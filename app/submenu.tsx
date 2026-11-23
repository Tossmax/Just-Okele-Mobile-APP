import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CartIconButton from "@/components/CartIconButton";
import UserOnly from "@/components/auth/UserOnly";
import { useCart } from "@/contexts/CartContext";
import { formatPrice, menuItems } from "@/features/menu/menuData";

const soupOptions = ["Fish", "Gbegiri", "Egusi"];
const defaultSoupByMeal: Record<string, string> = {
  amala: "Gbegiri",
  eba: "Egusi",
  ofada: "Fish",
  jollof: "Chicken",
};

export default function SubmenuRoute() {
  return (
    <UserOnly>
      <SubmenuScreen />
    </UserOnly>
  );
}

function SubmenuScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const item = menuItems.find((menuItem) => menuItem.id === id);
  const { setItemQuantity, getItemQuantity } = useCart();
  const defaultSoup = item
    ? (defaultSoupByMeal[item.id] ?? soupOptions[0])
    : soupOptions[0];
  const availableSoupOptions =
    defaultSoup === "Chicken" ? ["Chicken", ...soupOptions] : soupOptions;
  const [quantity, setQuantity] = useState(() =>
    item ? getItemQuantity(item.id, defaultSoup) || 1 : 1,
  );
  const [selectedSoup, setSelectedSoup] = useState(defaultSoup);
  const [reviewsVisible, setReviewsVisible] = useState(false);

  const updateQuantity = (nextQuantity: number) => {
    const updatedQuantity = Math.max(1, nextQuantity);
    setQuantity(updatedQuantity);

    if (item) {
      setItemQuantity(item, updatedQuantity, selectedSoup);
    }
  };

  if (!item) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={23} color="#AC4B04" />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <View style={styles.unavailable}>
          <Text style={styles.unavailableText}>This meal is unavailable.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    setItemQuantity(item, quantity, selectedSoup);
    Alert.alert(
      "Added to cart",
      `${quantity} × ${item.name} with ${selectedSoup} added.`,
      [
        { text: "Continue shopping", style: "cancel" },
        {
          text: "View cart",
          onPress: () => router.navigate("/(dashboard)/order"),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="Go back to menu"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={23} color="#AC4B04" />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text pointerEvents="none" style={styles.headerTitle}>
          Details
        </Text>
        <CartIconButton color="#AC4B04" />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Image source={item.image} style={styles.heroImage} />

        <View style={styles.quantityControl}>
          <Pressable
            accessibilityLabel="Decrease quantity"
            disabled={quantity <= 1}
            onPress={() => updateQuantity(quantity - 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>−</Text>
          </Pressable>
          <Text style={styles.quantityText}>{quantity}</Text>
          <Pressable
            accessibilityLabel="Increase quantity"
            onPress={() => updateQuantity(quantity + 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </Pressable>
        </View>

        <View style={styles.itemHeading}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>

        <Text style={styles.soupHeading}>Choose Favorite Soup</Text>
        <View style={styles.soupOptions}>
          {availableSoupOptions.map((soup) => {
            const isSelected = selectedSoup === soup;

            return (
              <Pressable
                key={soup}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                onPress={() => {
                  setSelectedSoup(soup);
                  setQuantity(getItemQuantity(item.id, soup) || 1);
                }}
                style={[
                  styles.soupOption,
                  isSelected && styles.selectedSoupOption,
                ]}
              >
                <Ionicons
                  name="restaurant-outline"
                  size={17}
                  color={isSelected ? "#FFFFFF" : "#AC4B04"}
                />
                <Text
                  style={[
                    styles.soupText,
                    isSelected && styles.selectedSoupText,
                  ]}
                >
                  {soup}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Read customer reviews"
          onPress={() => setReviewsVisible(true)}
          style={styles.ratingRow}
        >
          <View style={styles.rating}>
            <Ionicons name="star" size={17} color="#AC4B04" />
            <Text style={styles.ratingText}>4.5</Text>
            <Text style={styles.reviewCount}>(20)</Text>
          </View>
          <Ionicons name="chevron-forward" size={19} color="#E4D9D2" />
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          accessibilityLabel={`Add ${quantity} ${item.name} to cart`}
          onPress={handleAddToCart}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Add To Cart</Text>
        </Pressable>
      </View>

      <Modal
        visible={reviewsVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setReviewsVisible(false)}
      >
        <View style={styles.modalRoot}>
          <Pressable
            accessibilityLabel="Close reviews"
            onPress={() => setReviewsVisible(false)}
            style={[StyleSheet.absoluteFill, styles.modalBackdrop]}
          />
          <View style={styles.reviewSheet}>
            <View style={styles.sheetHandle} />
            <ScrollView
              style={styles.reviewList}
              contentContainerStyle={styles.reviewListContent}
              showsVerticalScrollIndicator={false}
            >
              {Array.from({ length: 9 }, (_, reviewIndex) => (
                <View
                  key={`${item.id}-review-${reviewIndex}`}
                  style={styles.reviewItem}
                >
                  <View style={styles.reviewerHeader}>
                    <Image
                      source={item.image}
                      style={styles.reviewAvatar}
                    />
                    <Text style={styles.reviewerName}>Ifeoluwa</Text>
                    <Text style={styles.reviewDate}>on Aug, 2026</Text>
                  </View>
                  <View style={styles.reviewRating}>
                    {[0, 1, 2, 3, 4].map((star) => (
                      <Ionicons
                        key={star}
                        name="star"
                        size={11}
                        color="#AC4B04"
                      />
                    ))}
                    <Text style={styles.reviewExcellent}>Excellent</Text>
                  </View>
                  <Text style={styles.reviewText} numberOfLines={1}>
                    I enjoyed the {item.name} and the delivery is on time.
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    height: 48,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#AC4B04",
    fontSize: 18,
    fontWeight: "700",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#AC4B04",
    fontSize: 16,
  },
  content: {
    paddingHorizontal: 22,
    paddingBottom: 20,
  },
  heroImage: {
    width: "100%",
    height: 340,
    borderRadius: 170,
    backgroundColor: "#F1EFED",
    marginTop: 4,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    marginTop: 12,
    marginBottom: 22,
  },
  quantityButton: {
    width: 58,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#EAEAEA",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    color: "#222222",
    fontSize: 21,
  },
  quantityText: {
    minWidth: 26,
    textAlign: "center",
    color: "#222222",
    fontSize: 19,
  },
  itemHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  itemName: {
    flex: 1,
    color: "#222222",
    fontSize: 25,
    fontWeight: "700",
  },
  itemPrice: {
    color: "#222222",
    fontSize: 19,
    fontWeight: "700",
  },
  description: {
    color: "#666666",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 5,
  },
  soupHeading: {
    color: "#666666",
    fontSize: 19,
    marginTop: 34,
    marginBottom: 12,
  },
  soupOptions: {
    flexDirection: "row",
    gap: 10,
  },
  soupOption: {
    flex: 1,
    minHeight: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 8,
    borderRadius: 16,
    backgroundColor: "#EEEEEE",
  },
  selectedSoupOption: {
    backgroundColor: "#AC4B04",
  },
  soupText: {
    color: "#444444",
    fontSize: 13,
  },
  selectedSoupText: {
    color: "#FFFFFF",
  },
  ratingRow: {
    minHeight: 54,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
    paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E5E5",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  ratingText: {
    color: "#222222",
    fontSize: 14,
  },
  reviewCount: {
    color: "#222222",
    fontSize: 14,
    marginLeft: 2,
  },
  footer: {
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 6,
    backgroundColor: "#FFFFFF",
  },
  addButton: {
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#AC4B04",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "500",
  },
  unavailable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  unavailableText: {
    color: "#444444",
    fontSize: 16,
  },
  modalRoot: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.55)",
  },
  reviewSheet: {
    height: "72%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 9,
    paddingBottom: 20,
  },
  sheetHandle: {
    alignSelf: "center",
    width: 136,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#E5E5E5",
  },
  reviewList: {
    flex: 1,
    marginTop: 56,
  },
  reviewListContent: {
    paddingHorizontal: 24,
    paddingBottom: 18,
  },
  reviewItem: {
    minHeight: 61,
    justifyContent: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#DADADA",
    paddingVertical: 5,
  },
  reviewerHeader: {
    height: 17,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  reviewAvatar: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  reviewerName: {
    color: "#222222",
    fontSize: 11,
    fontWeight: "600",
  },
  reviewDate: {
    color: "#777777",
    fontSize: 10,
    marginLeft: 3,
  },
  reviewRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
    marginTop: 1,
  },
  reviewExcellent: {
    color: "#AC4B04",
    fontSize: 10,
    marginLeft: 4,
  },
  reviewText: {
    color: "#222222",
    fontSize: 11,
    lineHeight: 14,
  },
});
