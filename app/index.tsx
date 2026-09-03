import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import splash from "../assets/images/splash.png";
import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {

  useEffect(() => {
      const timer = setTimeout(() => {
        router.replace("/OnboardingScreen");
      }, 3000); // 3 seconds
  
      return () => clearTimeout(timer);
    }, []);

  return (
    <ScrollView style={styles.bodyTag}>
       <Text style={styles.Title}>Just Okele</Text>
        <Text style={styles.SubTitle}>Mouth Watering</Text>
        <Text style={styles.SubTitle1}>Hot Recipes</Text>
        <View style={styles.foodLogo}>
        <Image source={splash} style={{ width: 300, height: 300 }} />
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bodyTag: {
    backgroundColor: "#AC4B04",
  },

  foodLogo: {
    flex: 1,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  Title: {
    fontSize: 28,
    color: "#fff",
    textAlign: "left",
    marginTop: 100,
    marginLeft: 24,
  },

  SubTitle: {
    fontSize: 18,
    color: "#fff",
    marginTop: 90,
    marginLeft: 24,
  },

  SubTitle1: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 24,
  }
})