import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [savedRecipes, setSavedRecipes] = useState(new Set());
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const loadUserAndSavedRecipes = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
          setUserId(user.id || "user1");
          setUserName(user.name || "Pengguna");
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
    },
    {
      id: "2",
      title: "Soto Medan",
      rating: 3.5,
      time: "11 Menit",
      img: require("../assets/soto-medan.jpg"),
      region: "Other",
    },
    {
      id: "3",
      title: "Dadar Padang",
      rating: 4.1,
      time: "13 Menit",
      img: require("../assets/dadar-padang.jpg"),
      region: "Other",
    },
    {
      id: "4",
      title: "Tahu Gimbal",
      rating: 4.3,
      time: "12 Menit",
      img: require("../assets/tahu-gimbal.jpg"),
      region: "Jawa Tengah",
    },
    {
      id: "5",
      title: "Garang Asem",
      rating: 4.5,
      time: "12 Menit",
      img: require("../assets/garang-asem.jpg"),
      region: "Jawa Tengah",
    },
    {
      id: "6",
      title: "Nasi Liwet Solo",
      rating: 4.2,
      time: "18 Menit",
      img: require("../assets/nasi-liwet-solo.jpg"),
      region: "Jawa Tengah",
    },
    {
      id: "7",
      title: "Lotek",
      rating: 4.8,
      time: "14 Menit",
      img: require("../assets/lotek.jpg"),
      region: "Jawa Barat",
    },
    {
      id: "8",
      title: "Nasi Timbel",
      rating: 5,
      time: "15 Menit",
      img: require("../assets/nasi-timbel.jpg"),
      region: "Jawa Barat",
    },
    {
      id: "9",
      title: "Batagor",
      rating: 4.9,
      time: "18 Menit",
      img: require("../assets/batagor.jpg"),
      region: "Jawa Barat",
    },
    {
      id: "10",
      title: "Tahu Campur",
      rating: 4.3,
      time: "12 Menit",
      img: require("../assets/tahu-campur.jpg"),
      region: "Jawa Timur",
    },
    {
      id: "11",
      title: "Lontong Balap",
      rating: 3.9,
      time: "20 Menit",
      img: require("../assets/lontong-balap.jpg"),
      region: "Jawa Timur",
    },
    {
      id: "12",
      title: "Rawon",
      rating: 4.4,
      time: "17 Menit",
      img: require("../assets/rawon.jpg"),
      region: "Jawa Timur",
    },
  ];

  const filteredRecipes =
    activeCategory === "Semua"
      ? allRecipes
      : allRecipes.filter((recipe) => recipe.region === activeCategory);

  const saveRecipe = async (recipeId) => {
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
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Halo {userName}</Text>
            <Text style={styles.subGreeting}>Kamu mau masak apa hari ini?</Text>
          </View>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqzSdsROcGXIB-SyqRqmT7PxKY3throkyWHw&s",
            }}
            style={styles.avatar}
          />
        </View>

        <TouchableOpacity
          style={styles.bookmarkContainer}
          onPress={() => navigation.navigate("Search")}
          activeOpacity={0.8}
        >
          <Text style={styles.bookmarkText}>Cari Resep makanan</Text>
          <View style={styles.filterButton}>
            <Ionicons name="options" size={20} color="#fff" />
          </View>
        </TouchableOpacity>

        <View style={styles.tabsWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabs}
            contentContainerStyle={styles.tabsContent}
          >
            {["Semua", "Jawa Tengah", "Jawa Barat", "Jawa Timur"].map(
              (label, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.tabButton,
                    activeCategory === label && styles.tabActive,
                  ]}
                  onPress={() => setActiveCategory(label)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeCategory === label && styles.tabTextActive,
                    ]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </ScrollView>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardsScroll}
        >
          {filteredRecipes.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.card}
              onPress={() => {
                if (item.title === "Mie Aceh") {
                  navigation.navigate("MieAceh");
                } else if (item.title === "Soto Medan") {
                  navigation.navigate("SotoMedan");
                } else if (item.title === "Tahu Gimbal") {
                  navigation.navigate("TahuGimbal");
                } else if (item.title === "Dadar Padang") {
                  navigation.navigate("DadarPadang");
                } else if (item.title === "Garang Asem") {
                  navigation.navigate("GarangAsem");
                } else if (item.title === "Nasi Liwet Solo") {
                  navigation.navigate("NasiLiwetSolo");
                } else if (item.title === "Lotek") {
                  navigation.navigate("Lotek");
                } else if (item.title === "Nasi Timbel") {
                  navigation.navigate("NasiTimbel");
                } else if (item.title === "Batagor") {
                  navigation.navigate("Batagor");
                } else if (item.title === "Tahu Campur") {
                  navigation.navigate("TahuCampur");
                } else if (item.title === "Lontong Balap") {
                  navigation.navigate("LontongBalap");
                } else if (item.title === "Rawon") {
                  navigation.navigate("Rawon");
                }
              }}
            >
              <View style={styles.card}>
                <Image source={item.img} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardTime}>Waktu</Text>
                  <Text style={styles.cardTime2}>{item.time}</Text>
                </View>
                <Text style={styles.cardRating}>★ {item.rating}</Text>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => saveRecipe(item.id)}
                >
                  <Ionicons
                    name={
                      savedRecipes.has(item.id)
                        ? "bookmark"
                        : "bookmark-outline"
                    }
                    size={16}
                    color={savedRecipes.has(item.id) ? "#FF6B6B" : "#aaa"}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>🍽️ Resep Baru</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.newRecipeCard}
            onPress={() => navigation.navigate("TahuGimbal")}
          >
            <Image
              source={require("../assets/tahu-gimbal.jpg")}
              style={styles.newRecipeImage}
            />
            <View style={styles.newRecipeContent}>
              <Text style={styles.newRecipeTitle}>Tahu Gimbal</Text>
              <Text style={styles.newRecipeMeta}>
                By Batis Situmorang · 12 Menit
              </Text>
            </View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => saveRecipe("4")}
            >
              <Ionicons
                name={savedRecipes.has("4") ? "bookmark" : "bookmark-outline"}
                size={16}
                color={savedRecipes.has("4") ? "#FF6B6B" : "#aaa"}
              />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.newRecipeCard}
            onPress={() => navigation.navigate("SotoMedan")}
          >
            <Image
              source={require("../assets/soto-medan.jpg")}
              style={styles.newRecipeImage}
            />
            <View style={styles.newRecipeContent}>
              <Text style={styles.newRecipeTitle}>Soto Medan</Text>
              <Text style={styles.newRecipeMeta}>
                By Herdika Cavellino · 11 Menit
              </Text>
            </View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => saveRecipe("2")}
            >
              <Ionicons
                name={savedRecipes.has("2") ? "bookmark" : "bookmark-outline"}
                size={16}
                color={savedRecipes.has("2") ? "#FF6B6B" : "#aaa"}
              />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.newRecipeCard}
            onPress={() => navigation.navigate("Rawon")}
          >
            <Image
              source={require("../assets/rawon.jpg")}
              style={styles.newRecipeImage}
            />
            <View style={styles.newRecipeContent}>
              <Text style={styles.newRecipeTitle}>Rawon</Text>
              <Text style={styles.newRecipeMeta}>
                By Karim Benzema · 17 Menit
              </Text>
            </View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => saveRecipe("12")}
            >
              <Ionicons
                name={savedRecipes.has("12") ? "bookmark" : "bookmark-outline"}
                size={16}
                color={savedRecipes.has("12") ? "#FF6B6B" : "#aaa"}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </ScrollView>

        <Text style={styles.sectionTitleDiskon}>🔥 Resep Populer</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardsScroll}
        >
          {[
            {
              id: "1",
              title: "Mie Aceh",
              rating: 4.5,
              time: "15 Menit",
              img: require("../assets/mie-aceh.jpg"),
            },
            {
              id: "9",
              title: "Batagor",
              rating: 4.9,
              time: "18 Menit",
              img: require("../assets/batagor.jpg"),
            },
            {
              id: "11",
              title: "Lontong Balap",
              rating: 3.9,
              time: "20 Menit",
              img: require("../assets/lontong-balap.jpg"),
            },
          ].map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.card}
              onPress={() => {
                if (item.title === "Mie Aceh") {
                  navigation.navigate("MieAceh");
                } else if (item.title === "Batagor") {
                  navigation.navigate("Batagor");
                } else if (item.title === "Lontong Balap") {
                  navigation.navigate("LontongBalap");
                }
              }}
            >
              <View style={styles.card}>
                <Image source={item.img} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardTime}>Waktu</Text>
                  <Text style={styles.cardTime2}>{item.time}</Text>
                </View>
                <Text style={styles.cardRating}>★ {item.rating}</Text>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => saveRecipe(item.id)}
                >
                  <Ionicons
                    name={
                      savedRecipes.has(item.id)
                        ? "bookmark"
                        : "bookmark-outline"
                    }
                    size={16}
                    color={savedRecipes.has(item.id) ? "#FF6B6B" : "#aaa"}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>🥣 Resep Tradisional</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.newRecipeCard}
            onPress={() => navigation.navigate("GarangAsem")}
          >
            <Image
              source={require("../assets/garang-asem.jpg")}
              style={styles.newRecipeImage}
            />
            <View style={styles.newRecipeContent}>
              <Text style={styles.newRecipeTitle}>Garang Asem</Text>
              <Text style={styles.newRecipeMeta}>
                By Batis Skibidi · 12 Menit
              </Text>
            </View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => saveRecipe("5")}
            >
              <Ionicons
                name={savedRecipes.has("5") ? "bookmark" : "bookmark-outline"}
                size={16}
                color={savedRecipes.has("5") ? "#FF6B6B" : "#aaa"}
              />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.newRecipeCard}
            onPress={() => navigation.navigate("NasiLiwetSolo")}
          >
            <Image
              source={require("../assets/nasi-liwet-solo.jpg")}
              style={styles.newRecipeImage}
            />
            <View style={styles.newRecipeContent}>
              <Text style={styles.newRecipeTitle}>Nasi Liwet Solo</Text>
              <Text style={styles.newRecipeMeta}>
                By Iqbal Ramadhan Karem · 18 Menit
              </Text>
            </View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => saveRecipe("6")}
            >
              <Ionicons
                name={savedRecipes.has("6") ? "bookmark" : "bookmark-outline"}
                size={16}
                color={savedRecipes.has("6") ? "#FF6B6B" : "#aaa"}
              />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.newRecipeCard}
            onPress={() => navigation.navigate("DadarPadang")}
          >
            <Image
              source={require("../assets/dadar-padang.jpg")}
              style={styles.newRecipeImage}
            />
            <View style={styles.newRecipeContent}>
              <Text style={styles.newRecipeTitle}>Dadar Padang</Text>
              <Text style={styles.newRecipeMeta}>
                By Jeremy Skena · 13 Menit
              </Text>
            </View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => saveRecipe("3")}
            >
              <Ionicons
                name={savedRecipes.has("3") ? "bookmark" : "bookmark-outline"}
                size={16}
                color={savedRecipes.has("3") ? "#FF6B6B" : "#aaa"}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </ScrollView>

        <Text style={styles.sectionTitle}>⭐ Resep Rating Tinggi</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardsScroll}
        >
          {[
            {
              id: "8",
              title: "Nasi Timbel",
              rating: 5,
              time: "15 Menit",
              img: require("../assets/nasi-timbel.jpg"),
            },
            {
              id: "9",
              title: "Batagor",
              rating: 4.9,
              time: "18 Menit",
              img: require("../assets/batagor.jpg"),
            },
            {
              id: "7",
              title: "Lotek",
              rating: 4.8,
              time: "14 Menit",
              img: require("../assets/lotek.jpg"),
            },
          ].map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.card}
              onPress={() => {
                if (item.title === "Nasi Timbel") {
                  navigation.navigate("NasiTimbel");
                } else if (item.title === "Batagor") {
                  navigation.navigate("Batagor");
                } else if (item.title === "Lotek") {
                  navigation.navigate("Lotek");
                }
              }}
            >
              <View style={styles.card}>
                <Image source={item.img} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardTime}>Waktu</Text>
                  <Text style={styles.cardTime2}>{item.time}</Text>
                </View>
                <Text style={styles.cardRating}>★ {item.rating}</Text>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => saveRecipe(item.id)}
                >
                  <Ionicons
                    name={
                      savedRecipes.has(item.id)
                        ? "bookmark"
                        : "bookmark-outline"
                    }
                    size={16}
                    color={savedRecipes.has(item.id) ? "#FF6B6B" : "#aaa"}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Ionicons name="home" size={24} color="#FF6B6B" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Saved")}>
          <Ionicons name="bookmark" size={24} color="#aaa" />
        </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  greeting: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
  subGreeting: { color: "#777", marginTop: 5 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginTop: 10 },
  bookmarkContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 20,
    marginTop: 0,
    marginBottom: 10,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bookmarkText: {
    color: "#bbb",
    fontSize: 14,
  },
  filterButton: {
    backgroundColor: "#FF6B6B",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tabsWrapper: {
    marginBottom: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  tabs: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
    flexGrow: 0,
  },
  tabsContent: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "#ffe97a",
    borderRadius: 15,
  },
  tabText: { color: "#FF7A7A", fontSize: 12, fontWeight: "bold" },
  tabTextActive: { color: "#FF7A7A", fontWeight: "bold" },
  cardsScroll: {
    paddingLeft: 20,
    marginTop: 0,
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 10,
  },
  card: {
    width: 140,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    marginRight: 15,
    overflow: "hidden",
    position: "relative",
  },
  cardImage: { width: "100%", height: 90 },
  cardContent: { padding: 10, height: 130 },
  cardTitle: { fontWeight: "bold" },
  cardTime: { fontSize: 12, color: "#666", marginTop: 60 },
  cardTime2: {
    fontSize: 12,
    color: "#666",
    fontWeight: "bold",
  },
  cardRating: {
    position: "absolute",
    top: 5,
    right: 10,
    backgroundColor: "#ffe97a",
    borderRadius: 5,
    padding: 2,
    fontSize: 12,
  },
  saveButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "transparent",
    padding: 5,
    borderRadius: 5,
  },
  sectionTitle: {
    marginHorizontal: 20,
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitleDiskon: {
    marginHorizontal: 20,
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
  },
  newRecipeCard: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    height: 100,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    position: "relative",
  },
  newRecipeImage: { width: 80, height: 70, borderRadius: 10, marginRight: 10 },
  newRecipeContent: { flex: 1 },
  newRecipeTitle: { fontWeight: "bold" },
  newRecipeMeta: { color: "#888", fontSize: 12 },
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
