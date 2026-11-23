import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "@/contexts/CartContext";
import { useDeliveryAddress } from "@/contexts/DeliveryAddressContext";
import { formatPrice } from "@/features/menu/menuData";

type PaymentMethod = "flutterwave";

const paymentMethods: { id: PaymentMethod; label: string }[] = [
  { id: "flutterwave", label: "Pay with Flutterwave" },
];

const paymentDiscountRate = 0.128;

export default function Checkout() {
  const { total } = useCart();
  const { address } = useDeliveryAddress();
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethod>("flutterwave");
  const paymentDiscount = Math.round(total * paymentDiscountRate);
  const paymentTotal = total - paymentDiscount;

  useEffect(() => {
    if (!address) {
      router.replace("/delivery-address");
    }
  }, [address]);

  const handlePay = () => {
    Alert.alert(
      "Flutterwave is not connected yet",
      "Your order has not been charged. Connect the secure backend endpoint to continue.",
    );
  };

  if (!address) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={27} color="#222222" />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Order Summary</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.deliveryCard}>
          <Ionicons
            name="location-outline"
            size={24}
            color="#AC4B04"
            style={styles.deliveryIcon}
          />
          <View style={styles.deliveryDetails}>
            <Text style={styles.deliveryTitle}>Deliver to</Text>
            <Text style={styles.deliveryName}>{address.fullName}</Text>
            <Text style={styles.deliveryText}>
              {address.street}, {address.city}, {address.state}
            </Text>
            <Text style={styles.deliveryText}>{address.phone}</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Change delivery address"
            onPress={() =>
              router.push({
                pathname: "/delivery-address",
                params: { returnToCheckout: "true" },
              })
            }
            style={styles.changeAddressButton}
          >
            <Text style={styles.changeAddressText}>Change</Text>
          </Pressable>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Order Total</Text>
            <Text style={styles.summaryValue}>{formatPrice(total)}</Text>
          </View>
          <View style={styles.discountRow}>
            <Text style={styles.discountLabel}>Payment Discount</Text>
            <Text style={styles.summaryValue}>
              -{formatPrice(paymentDiscount)}
            </Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.paymentTotalRow}>
            <Text style={styles.paymentTotalLabel}>TOTAL Payment</Text>
            <Text style={styles.summaryValue}>{formatPrice(paymentTotal)}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Choose a payment Method</Text>
        <View style={styles.methods}>
          {paymentMethods.map((method) => {
            const isSelected = selectedMethod === method.id;

            return (
              <Pressable
                key={method.id}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                onPress={() => setSelectedMethod(method.id)}
                style={styles.methodCard}
              >
                <View
                  style={[
                    styles.radio,
                    isSelected && styles.selectedRadio,
                  ]}
                >
                  {isSelected && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.methodLabel}>{method.label}</Text>
                <View style={styles.methodLogo}>
                  {method.id === "flutterwave" && (
                    <Ionicons
                      name="card-outline"
                      size={39}
                      color="#AC4B04"
                    />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={handlePay}
          style={styles.payButton}
        >
          <Text style={styles.payButtonText}>
            Pay | {formatPrice(paymentTotal)}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 28,
  },
  backButton: {
    minWidth: 75,
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#222222",
    fontSize: 16,
    marginLeft: -3,
  },
  headerTitle: {
    color: "#222222",
    fontSize: 19,
    fontWeight: "600",
  },
  headerSpacer: {
    width: 75,
  },
  content: {
    paddingHorizontal: 35,
    paddingTop: 26,
    paddingBottom: 35,
  },
  deliveryCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginBottom: 20,
    borderRadius: 14,
    backgroundColor: "#F5F5F5",
  },
  deliveryIcon: {
    marginRight: 10,
  },
  deliveryDetails: {
    flex: 1,
  },
  deliveryTitle: {
    color: "#666666",
    fontSize: 12,
    marginBottom: 3,
  },
  deliveryName: {
    color: "#222222",
    fontSize: 14,
    fontWeight: "600",
  },
  deliveryText: {
    color: "#666666",
    fontSize: 12,
    marginTop: 2,
  },
  changeAddressButton: {
    paddingLeft: 8,
    paddingVertical: 8,
  },
  changeAddressText: {
    color: "#AC4B04",
    fontSize: 12,
    fontWeight: "600",
  },
  summaryCard: {
    paddingHorizontal: 23,
    paddingVertical: 20,
    borderRadius: 17,
    backgroundColor: "#EAEAEA",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 17,
  },
  summaryLabel: {
    color: "#666666",
    fontSize: 15,
  },
  summaryValue: {
    color: "#111111",
    fontSize: 14,
    fontWeight: "500",
  },
  discountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  discountLabel: {
    color: "#666666",
    fontSize: 12,
  },
  summaryDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#AFAFAF",
    marginBottom: 17,
  },
  paymentTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentTotalLabel: {
    color: "#666666",
    fontSize: 14,
  },
  sectionTitle: {
    color: "#222222",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 40,
    marginBottom: 17,
  },
  methods: {
    gap: 63,
  },
  methodCard: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    borderRadius: 14,
    backgroundColor: "#EAEAEA",
  },
  radio: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#666666",
    borderRadius: 21,
  },
  selectedRadio: {
    borderColor: "#AC4B04",
  },
  radioDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#AC4B04",
  },
  methodLabel: {
    flex: 1,
    color: "#666666",
    fontSize: 14,
    textAlign: "center",
  },
  methodLogo: {
    width: 53,
    alignItems: "center",
    justifyContent: "center",
  },
  payButton: {
    height: 49,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
    backgroundColor: "#AC4B04",
    marginTop: 40,
  },
  payButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "500",
  },
});
