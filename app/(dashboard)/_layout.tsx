import { Tabs } from 'expo-router'
import React from 'react'

export default function Home() {
  return (
    <Tabs>
        <Tabs.Screen name="home" options={{ title: 'Home' }} />
        <Tabs.Screen name="favorite" options={{ title: 'Favorite' }} />
        <Tabs.Screen name="order" options={{ title: 'Order' }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  )
}
