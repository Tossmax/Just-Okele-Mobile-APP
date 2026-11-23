import { CartProvider } from "@/contexts/CartContext";
import { DeliveryAddressProvider } from "@/contexts/DeliveryAddressContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { UserProvider } from "@/contexts/UserContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <UserProvider>
      <CartProvider>
        <FavoritesProvider>
          <DeliveryAddressProvider>
            <Stack>
              <Stack.Screen
                name="OnboardingScreen"
                options={{
                  title: "",
                  headerTransparent: true,
                  headerTintColor: "#000000",
                }}
              />
              <Stack.Screen
                name="index"
                options={{
                  title: "",
                  headerStyle: {
                    backgroundColor: "#AC4B04",
                  },
                  headerTransparent: true,
                  headerTintColor: "#FFFFFF",
                }}
              />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen
                name="(dashboard)"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="submenu" options={{ headerShown: false }} />
              <Stack.Screen name="delivery-address" options={{ headerShown: false }} />
              <Stack.Screen name="checkout" options={{ headerShown: false }} />
            </Stack>
          </DeliveryAddressProvider>
        </FavoritesProvider>
      </CartProvider>
    </UserProvider>
  );
}
