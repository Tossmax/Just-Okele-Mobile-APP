import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";

export default function TrackOrder() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Track Order</Text>
      <View style={styles.emptyState}>
        <Ionicons name="location-outline" size={42} color="#AC4B04" />
        <Text style={styles.emptyTitle}>No active orders</Text>
        <Text style={styles.description}>
          Your order updates will appear here once your meal is on its way.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  title: {
    alignSelf: "center",
    color: "#222222",
    fontSize: 21,
    fontWeight: "600",
    marginTop: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 35,
  },
  emptyTitle: {
    color: "#222222",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 14,
  },
  description: {
    color: "#666666",
    fontSize: 14,
    textAlign: "center",
    marginTop: 6,
  },
});
