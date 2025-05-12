import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function App() {
  const navigation = useNavigation();

  console.log("Navigation from useNavigation:", navigation);

  return (
    <ImageBackground
      source={require("../assets/BackgroundWelcome.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Image
          source={require("../assets/LogoWelcome.jpeg")}
          style={styles.logoImage}
        />
        <Text style={styles.logoText}>ARCHIPEDIA</Text>
        <Text style={styles.title}>Ayo{"\n"}Masak</Text>
        <Text style={styles.subtitle}>Cara Mudah Menemukan Resep Lezat</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (navigation) {
              navigation.navigate("Login");
            } else {
              console.error("Navigation is Error");
            }
          }}
        >
          <Text style={styles.buttonText}>Mulai Memasak →</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  logoImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  logoText: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 200,
    fontWeight: "600",
  },
  title: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 60,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 80,
    fontWeight: "semibold",
  },
  button: {
    backgroundColor: "#FF7A7A",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
