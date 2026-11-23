import { Tabs } from 'expo-router'

import {Ionicons} from '@expo/vector-icons'

import UserOnly from '@/components/auth/UserOnly'

export default function Home() {
  return (
    <UserOnly>
      <Tabs screenOptions={{ headerShown: false, tabBarStyle: {
            backgroundColor: '#fff',
            paddingTop: 8,
            paddingBottom: 8,
            height: 76},
            tabBarLabelStyle: { fontSize: 11 },
            tabBarActiveTintColor: '#AC4B04',
            tabBarInactiveTintColor: '#000000'
          }}>
        <Tabs.Screen name="home" options={{ title: 'Home', tabBarIcon: ({focused}) => (
              <Ionicons name={focused ? "home" : "home-outline"}
              size={24}
              color={focused ? "#AC4B04" : "#000000"} 
              />
        ) }} />
        <Tabs.Screen name="favorite" options={{ title: 'Favorites', tabBarIcon: ({focused}) => (
              <Ionicons name={focused ? "heart" : "heart-outline"}
              size={24}
              color={focused ? "#AC4B04" : "#000000"} 
              />
        ) }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({focused}) => (
              <Ionicons name={focused ? "person" : "person-outline"}
              size={24}
              color={focused ? "#AC4B04" : "#000000"} 
              />
        ) }} />
        <Tabs.Screen name="order" options={{ title: 'Orders', tabBarIcon: ({focused}) => (
              <Ionicons name={focused ? "cart" : "cart-outline"}
              size={24}
              color={focused ? "#AC4B04" : "#000000"} 
              />
        ) }} />
        <Tabs.Screen name="track-order" options={{ title: 'Track Order', tabBarIcon: ({focused}) => (
              <Ionicons name={focused ? "location" : "location-outline"}
              size={24}
              color={focused ? "#AC4B04" : "#000000"} 
              />
        ) }} />
      </Tabs>
    </UserOnly>
  )
}
