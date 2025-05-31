import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [savedRecipes, setSavedRecipes] = useState(new Set());
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
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
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: "Welcome" }],
          });
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
        navigation.reset({
          index: 0,
          routes: [{ name: "Welcome" }],
        });
      }
    };
    fetchUserData();
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      if (userId) {
        await AsyncStorage.removeItem(`savedRecipes_${userId}`);
      }
      navigation.reset({
        index: 0,
        routes: [{ name: "Welcome" }],
      });
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      setLogoutModalVisible(false);
    }
  };

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
      <View style={styles.fixedHeader}>
        <Text style={styles.headerTitle}>Profil</Text>
        <TouchableOpacity
          onPress={() => setLogoutModalVisible(true)}
          style={styles.logoutButton}
        >
          <Ionicons name="log-out" size={24} color="#FF5A5F" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqzSdsROcGXIB-SyqRqmT7PxKY3throkyWHw&s",
            }}
            style={styles.avatar}
          />
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>
                {filteredSavedRecipes.length}
              </Text>
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
          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.title}>Chef Profesional</Text>
          <Text style={styles.bio}>Passionate about food and life 🍜🍕🥗</Text>
          <TouchableOpacity>
            <Text style={styles.more}>More...</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
          <View style={[styles.tabButton, styles.tabActive]}>
            <Text style={styles.tabTextActive}>Simpanan Resep</Text>
          </View>
        </View>

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
                            color={
                              savedRecipes.has(recipe.id) ? "#FF6B6B" : "#aaa"
                            }
                            style={styles.iconShadow}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Text style={styles.recipeRating}>★ {recipe.rating}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noRecipes}></Text>
        )}
      </ScrollView>

      <Modal
        transparent={true}
        visible={isLogoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Konfirmasi Logout</Text>
            <Text style={styles.modalMessage}>
              Apakah Anda yakin ingin logout?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.logoutButtonModal]}
                onPress={handleLogout}
              >
                <Text style={styles.modalButtonText}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButtonModal]}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Batal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="home" size={24} color="#aaa" />
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
          <Ionicons name="person" size={24} color="#FF6B6B" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  fixedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFF",
    zIndex: 10,
    marginTop: 40,
  },
  scrollContent: {
    marginTop: 100,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  logoutButton: {
    padding: 5,
  },
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
  recipeTitleAuthor: {
    top: 15,
  },
  recipeCard: {
    marginHorizontal: 9,
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonModal: {
    backgroundColor: "#FF5A5F",
  },
  cancelButtonModal: {
    backgroundColor: "#DDD",
  },
  modalButtonText: {
    color: "#FFF",
    fontWeight: "bold",
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
  addButton: {
    backgroundColor: "#f67d7d",
    padding: 10,
    borderRadius: 30,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
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

export default ProfileScreen;
