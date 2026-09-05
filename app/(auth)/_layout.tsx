import GuestOnly from "@/components/auth/GuestOnly";
import { useUser } from "@/hooks/useUser";
import { Stack } from "expo-router";

export default function RootLayout() {

  const { user } = useUser()
  console.log(user)

  return (
    <GuestOnly>
      <Stack screenOptions={{ headerShown: false}} />
    </GuestOnly>
  ); 
}
