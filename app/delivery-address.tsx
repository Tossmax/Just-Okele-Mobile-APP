import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDeliveryAddress } from "@/contexts/DeliveryAddressContext";
import type { DeliveryAddress } from "@/contexts/DeliveryAddressContext";

type AddressField = keyof DeliveryAddress;

const fields: {
  key: AddressField;
  label: string;
  placeholder: string;
  keyboardType?: "default" | "phone-pad";
  autoCapitalize?: "words" | "none";
}[] = [
  {
    key: "fullName",
    label: "Full name",
    placeholder: "Enter recipient's full name",
    autoCapitalize: "words",
  },
  {
    key: "phone",
    label: "Phone number",
    placeholder: "Enter phone number",
    keyboardType: "phone-pad",
    autoCapitalize: "none",
  },
  {
    key: "street",
    label: "Street address",
    placeholder: "House number, street, area",
    autoCapitalize: "words",
  },
  {
    key: "city",
    label: "City",
    placeholder: "Enter city",
    autoCapitalize: "words",
  },
  {
    key: "state",
    label: "State",
    placeholder: "Enter state",
    autoCapitalize: "words",
  },
];

const emptyAddress: DeliveryAddress = {
  fullName: "",
  phone: "",
  street: "",
  city: "",
  state: "",
};

export default function DeliveryAddressScreen() {
  const { returnToCheckout } = useLocalSearchParams<{
    returnToCheckout?: string;
  }>();
  const { address, saveAddress } = useDeliveryAddress();
  const [form, setForm] = useState<DeliveryAddress>(address ?? emptyAddress);
  const [errors, setErrors] = useState<Partial<Record<AddressField, string>>>(
    {},
  );

  const updateField = (field: AddressField, value: string) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
  };

  const continueToCheckout = () => {
    const nextErrors: Partial<Record<AddressField, string>> = {};

    fields.forEach(({ key, label }) => {
      if (!form[key].trim()) {
        nextErrors[key] = `${label} is required`;
      }
    });

    const phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      nextErrors.phone = "Enter a valid phone number";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    saveAddress({
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      street: form.street.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
    });
    if (returnToCheckout === "true") {
      router.back();
    } else {
      router.push("/checkout");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
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
          <Text style={styles.headerTitle}>Delivery Address</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.heading}>Where should we deliver your food?</Text>
          <Text style={styles.description}>
            Enter the recipient and delivery address for this order.
          </Text>

          {fields.map((field) => (
            <View key={field.key} style={styles.fieldGroup}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput
                accessibilityLabel={field.label}
                value={form[field.key]}
                onChangeText={(value) => updateField(field.key, value)}
                placeholder={field.placeholder}
                placeholderTextColor="#888888"
                keyboardType={field.keyboardType ?? "default"}
                autoCapitalize={field.autoCapitalize ?? "words"}
                style={[
                  styles.input,
                  errors[field.key] && styles.inputError,
                ]}
              />
              {errors[field.key] && (
                <Text style={styles.errorText}>{errors[field.key]}</Text>
              )}
            </View>
          ))}

          <Pressable
            accessibilityRole="button"
            onPress={continueToCheckout}
            style={styles.continueButton}
          >
            <Text style={styles.continueButtonText}>Continue to Checkout</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  flex: {
    flex: 1,
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
    paddingHorizontal: 28,
    paddingTop: 26,
    paddingBottom: 36,
  },
  heading: {
    color: "#222222",
    fontSize: 21,
    fontWeight: "700",
  },
  description: {
    color: "#666666",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 25,
  },
  fieldGroup: {
    marginBottom: 17,
  },
  label: {
    color: "#333333",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 7,
  },
  input: {
    height: 50,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#D4D4D4",
    borderRadius: 11,
    color: "#222222",
    fontSize: 15,
    backgroundColor: "#FFFFFF",
  },
  inputError: {
    borderColor: "#B3261E",
  },
  errorText: {
    color: "#B3261E",
    fontSize: 12,
    marginTop: 5,
  },
  continueButton: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
    backgroundColor: "#AC4B04",
    marginTop: 14,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
