import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function SavedScreen() {
  const navigation = useNavigation();
  const savedRecipes = [
    {
      title: "Nasi Iga Bakar",
      author: "Chef John",
      rating: 4.0,
      time: "20 min",
      img: require("../assets/mie-aceh.jpg"),
    },
    {
      title: "Ayam Betutu",
      author: "Mark Kelvin",
      rating: 4.0,
      time: "20 min",
      img: require("../assets/mie-aceh.jpg"),
    },
    {
      title: "Nasi Bali",
      author: "Spicy Nelly",
      rating: 4.0,
      time: "20 min",
      img: require("../assets/mie-aceh.jpg"),
    },
    {
      title: "Lunch with",
      author: "Spicy Nelly",
      rating: 3.0,
      time: "20 min",
      img: require("../assets/mie-aceh.jpg"),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headerTitle}>Resep Tersimpan</Text>
        {savedRecipes.map((recipe, index) => (
          <View key={index} style={styles.recipeCard}>
            <Image source={recipe.img} style={styles.recipeImage} />
            <Text style={styles.recipeRating}>★ {recipe.rating}</Text>
            <View style={styles.overlayContent}>
              <View style={styles.textContainer}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <Text style={styles.recipeMeta}>Oleh {recipe.author}</Text>
              </View>
              <View style={styles.iconContainer}>
                <View style={styles.timeContainer}>
                  <Ionicons
                    name="time-outline"
                    size={14}
                    color="#fff"
                    style={styles.iconShadow}
                  />
                  <Text style={styles.recipeTime}>{recipe.time}</Text>
                </View>
                <TouchableOpacity style={styles.saveButton}>
                  <Ionicons
                    name="bookmark"
                    size={14}
                    color="#aaa"
                    style={styles.iconShadow}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="home" size={24} color="#aaa" />
        </TouchableOpacity>
        <Ionicons name="bookmark" size={24} color="#FF6B6B" />
        <TouchableOpacity style={styles.plusButton}>
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
        <Ionicons name="notifications" size={24} color="#aaa" />
        <Ionicons name="person" size={24} color="#aaa" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fff7", paddingTop: 50 },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  recipeCard: {
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: "#000",
    overflow: "hidden",
    position: "relative",
  },
  recipeImage: {
    width: "100%",
    height: 150,
  },
  overlayContent: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  textContainer: {
    flex: 1,
  },
  recipeTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  recipeMeta: {
    color: "#FFFFFf",
    fontSize: 10,
    marginTop: 2,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  recipeTime: {
    fontSize: 12,
    color: "#fff",
    marginLeft: 5,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  saveButton: {
    marginLeft: 5,
  },
  iconShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  recipeRating: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#ffe97a",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 12,
  },
  bottomNav: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 10,
  },
  plusButton: {
    backgroundColor: "#FF6B6B",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -35,
  },
});
