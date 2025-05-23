import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
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
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Profil</Text>

      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqzSdsROcGXIB-SyqRqmT7PxKY3throkyWHw&s",
          }}
          style={styles.avatar}
        />
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Resep</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Pengikut</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>259</Text>
            <Text style={styles.statLabel}>Mengikuti</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.name}>Cut Andriana Siregar</Text>
        <Text style={styles.title}>Chef Profesional</Text>
        <Text style={styles.bio}>Passionate about food and life 🍜🍕🥗</Text>
        <TouchableOpacity>
          <Text style={styles.more}>More...</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tabButton, styles.tabActive]}>
          <Text style={styles.tabTextActive}>Resep</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Tag</Text>
        </TouchableOpacity>
      </View>

      {savedRecipes.map((recipe, index) => (
        <View key={index} style={styles.recipeCard}>
          <Image source={recipe.img} style={styles.menuContainer} />
          <View style={styles.recipeOverlay}>
            <View style={styles.recipeTitleAuthor}>
              <Text style={styles.recipeTitle}>{recipe.title}</Text>
              <Text style={styles.recipeMeta}>Oleh {recipe.author}</Text>
            </View>
            <View style={styles.recipeMeta}>
              <View style={styles.iconContainer}>
                <View style={styles.timeContainer}>
                  <View style={styles.timeButton}>
                    <Ionicons
                      name="time-outline"
                      size={14}
                      color="#fff"
                      style={styles.iconShadow}
                    />
                  </View>
                  <Text style={styles.recipeTime}>{recipe.time}</Text>
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
              <Text style={styles.recipeRating}>★ {recipe.rating}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 40 },
  profileHeader: { flexDirection: "row", padding: 20, alignItems: "center" },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  stats: { flexDirection: "row", marginLeft: 20 },
  stat: { alignItems: "center", marginHorizontal: 10 },
  statNumber: { fontWeight: "bold", fontSize: 16 },
  statLabel: { fontSize: 16, color: "gray" },

  infoSection: { paddingHorizontal: 20, margin: 4 },
  name: { fontSize: 18, fontWeight: "bold" },
  title: { fontSize: 13, color: "gray" },
  bio: { marginVertical: 4, fontSize: 13 },
  more: { color: "red", fontSize: 13 },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginTop: 10,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  tabText: {
    color: "#FF7A7A",
    fontWeight: "bold",
  },
  tabActive: {
    backgroundColor: "#FFD966",
  },
  tabTextActive: {
    color: "#000",
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    top: 15,
  },
  recipeTitleAuthor: {
    top: 15,
  },
  recipeCard: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 2,
  },
  menuContainer: {
    width: "100%",
    height: 150,
  },
  recipeOverlay: {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  saveButton: {
    left: 265,
  },
  iconShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  recipeTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  timeButton: {
    left: 255,
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
  recipeTime: {
    fontSize: 12,
    color: "#fff",
    left: 260,
    top: 0,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  recipeRating: {
    position: "absolute",
    bottom: 110,
    left: 290,
    backgroundColor: "#ffe97a",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 12,
  },
});

export default ProfileScreen;
