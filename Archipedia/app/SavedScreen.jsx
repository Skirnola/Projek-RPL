import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SavedScreen() {
  const navigation = useNavigation();
  const [savedRecipes, setSavedRecipes] = useState(new Set());
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadUserAndSavedRecipes = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
          setUserId(user.id || "user1"); 
          const saved = await AsyncStorage.getItem(
            `savedRecipes_${user.id || "user1"}`
          );
          if (saved) {
            setSavedRecipes(new Set(JSON.parse(saved)));
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadUserAndSavedRecipes();
  }, []);

  const allRecipes = [
    {
      id: "1",
      title: "Mie Aceh",
      rating: 4.5,
      time: "15 Menit",
      img: require("../assets/mie-aceh.jpg"),
      region: "Other",
      author: "Batis Situmorang",
    },
    {
      id: "2",
      title: "Soto Medan",
      rating: 3.5,
      time: "11 Menit",
      img: require("../assets/soto-medan.jpg"),
      region: "Other",
      author: "Herdika Cavellino",
    },
    {
      id: "3",
      title: "Dadar Padang",
      rating: 4.1,
      time: "13 Menit",
      img: require("../assets/dadar-padang.jpg"),
      region: "Other",
      author: "Jeremy Skena",
    },
    {
      id: "4",
      title: "Tahu Gimbal",
      rating: 4.3,
      time: "12 Menit",
      img: require("../assets/tahu-gimbal.jpg"),
      region: "Jawa Tengah",
      author: "Batis Situmorang",
    },
    {
      id: "5",
      title: "Garang Asem",
      rating: 4.5,
      time: "12 Menit",
      img: require("../assets/garang-asem.jpg"),
      region: "Jawa Tengah",
      author: "Batis Skibidi",
    },
    {
      id: "6",
      title: "Nasi Liwet Solo",
      rating: 4.2,
      time: "18 Menit",
      img: require("../assets/nasi-liwet-solo.jpg"),
      region: "Jawa Tengah",
      author: "Iqbal Ramadhan Karem",
    },
    {
      id: "7",
      title: "Lotek",
      rating: 4.8,
      time: "14 Menit",
      img: require("../assets/lotek.jpg"),
      region: "Jawa Barat",
      author: "Spicy Nelly",
    },
    {
      id: "8",
      title: "Nasi Timbel",
      rating: 5,
      time: "15 Menit",
      img: require("../assets/nasi-timbel.jpg"),
      region: "Jawa Barat",
      author: "Spicy Nelly",
    },
    {
      id: "9",
      title: "Batagor",
      rating: 4.9,
      time: "18 Menit",
      img: require("../assets/batagor.jpg"),
      region: "Jawa Barat",
      author: "Spicy Nelly",
    },
    {
      id: "10",
      title: "Tahu Campur",
      rating: 4.3,
      time: "12 Menit",
      img: require("../assets/tahu-campur.jpg"),
      region: "Jawa Timur",
      author: "Spicy Nelly",
    },
    {
      id: "11",
      title: "Lontong Balap",
      rating: 3.9,
      time: "20 Menit",
      img: require("../assets/lontong-balap.jpg"),
      region: "Jawa Timur",
      author: "Spicy Nelly",
    },
    {
      id: "12",
      title: "Rawon",
      rating: 4.4,
      time: "17 Menit",
      img: require("../assets/rawon.jpg"),
      region: "Jawa Timur",
      author: "Karim Benzema",
    },
  ];

  const filteredSavedRecipes = allRecipes.filter((recipe) =>
    savedRecipes.has(recipe.id)
  );

  const toggleSaveRecipe = async (recipeId) => {
    if (!userId) return;
    const newSavedRecipes = new Set(savedRecipes);
    if (newSavedRecipes.has(recipeId)) {
      newSavedRecipes.delete(recipeId);
    } else {
      newSavedRecipes.add(recipeId);
    }
    setSavedRecipes(newSavedRecipes);
    try {
      await AsyncStorage.setItem(
        `savedRecipes_${userId}`,
        JSON.stringify(Array.from(newSavedRecipes))
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headerTitle}>Resep Tersimpan</Text>
        {filteredSavedRecipes.length > 0 ? (
          filteredSavedRecipes.map((recipe, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recipeCard}
              onPress={() => {
                if (recipe.title === "Mie Aceh") {
                  navigation.navigate("MieAceh");
                } else if (recipe.title === "Soto Medan") {
                  navigation.navigate("SotoMedan");
                } else if (recipe.title === "Tahu Gimbal") {
                  navigation.navigate("TahuGimbal");
                } else if (recipe.title === "Dadar Padang") {
                  navigation.navigate("DadarPadang");
                } else if (recipe.title === "Garang Asem") {
                  navigation.navigate("GarangAsem");
                } else if (recipe.title === "Nasi Liwet Solo") {
                  navigation.navigate("NasiLiwetSolo");
                } else if (recipe.title === "Lotek") {
                  navigation.navigate("Lotek");
                } else if (recipe.title === "Nasi Timbel") {
                  navigation.navigate("NasiTimbel");
                } else if (recipe.title === "Batagor") {
                  navigation.navigate("Batagor");
                } else if (recipe.title === "Tahu Campur") {
                  navigation.navigate("TahuCampur");
                } else if (recipe.title === "Lontong Balap") {
                  navigation.navigate("LontongBalap");
                } else if (recipe.title === "Rawon") {
                  navigation.navigate("Rawon");
                }
              }}
            >
              <View style={styles.recipeCard}>
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
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={() => toggleSaveRecipe(recipe.id)}
                    >
                      <Ionicons
                        name={
                          savedRecipes.has(recipe.id)
                            ? "bookmark"
                            : "bookmark-outline"
                        }
                        size={14}
                        color={savedRecipes.has(recipe.id) ? "#FF6B6B" : "#aaa"}
                        style={styles.iconShadow}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noRecipes}>Tidak ada resep tersimpan.</Text>
        )}
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
        <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
          <Ionicons name="notifications" size={24} color="#aaa" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person" size={24} color="#aaa" />
        </TouchableOpacity>
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
    marginHorizontal: 10,
    marginBottom: 15,
    borderRadius: 15,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "transparent",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  recipeImage: {
    width: "100%",
    height: 150,
    borderRadius: 15,
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
  noRecipes: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
    fontSize: 16,
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
