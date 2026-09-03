import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";

const { width, height } = Dimensions.get("window");

const onboardingData = [
  {
    id: "1",
    title: "Top Nigerian Chefs",
    description:
      "We cook the best yoruba food and for a guest it might be the first taste of their life. We want it to be remembered forever",
    image: require("../assets/images/onb3.jpg"),
  },
  {
    id: "2",
    title: "Delicious Nigerian Food",
    description:
      "Enjoy delicious Nigerian meals prepared by some of the best chefs and discover amazing flavours you will love.",
    image: require("../assets/images/onb4.jpg"),
  },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current.scrollToIndex({
        index: currentIndex + 1,
        animated: false,
      });
    } else {
      // Navigate to your Home screen here
      router.push("/(auth)/login");
      console.log("Go to Login Screen");
    }
  };

  const handleSkip = () => {
    // Navigate directly to your Home screen
    router.push("/(auth)/login");
    console.log("Skip onboarding");
  };

  const handleScroll = (event) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / width
    );

    setCurrentIndex(index);
  };

  const isLastSlide = currentIndex === onboardingData.length - 1;

  return (
    <View style={styles.container}>
    <StatusBar
    style="light"
    translucent
    backgroundColor="transparent"
    />

      <FlatList
        ref={flatListRef}
        data={onboardingData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.slide}>

            {/* Food Image */}
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="cover"
            />

            {/* Content */}
            <View style={styles.content}>
              <Text style={styles.title}>
                {item.title}
              </Text>

              <Text style={styles.description}>
                {item.description}
              </Text>

              {/* Pagination */}
              <View style={styles.pagination}>
                {onboardingData.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      currentIndex === index
                        ? styles.activeDot
                        : styles.inactiveDot,
                    ]}
                  />
                ))}
              </View>

              {/* Next Button */}
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNext}
                activeOpacity={0.8}
              >
                <Text style={styles.nextText}>
                  {isLastSlide ? 'Get Started' : 'Next'}
                </Text>
              </TouchableOpacity>

              {!isLastSlide && (
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}

            </View>

          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  slide: {
    width: width,
    height: height,
    backgroundColor: "#FFFFFF",
  },

  image: {
    width: width,
    height: height * 0.49,
    marginTop: 0,
  },

  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 35,
  },

  title: {
    fontSize: 21,
    fontWeight: "700",
    color: "#222222",
    marginTop: 17,
    marginBottom: 26,
    textAlign: "center",
  },

  description: {
    width: "100%",
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "400",
    color: "#171717",
    textAlign: "left",
  },

  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 36,
    marginBottom: 31,
  },

  dot: {
    height: 14,
    width: 14,
    borderRadius: 7,
    marginHorizontal: 2,
  },

  activeDot: {
    backgroundColor: "#AC4B04",
    width: 60,
  },

  inactiveDot: {
    backgroundColor: "#BDBDBD",
  },

  nextButton: {
    width: "100%",
    height: 49,
    backgroundColor: "#B84D00",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  nextText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "400",
  },

  skipText: {
    color: "#252525",
    fontSize: 20,
    marginTop: 36,
  },
});