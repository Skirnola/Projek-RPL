import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Halo Andriana</Text>
          <Text style={styles.subGreeting}>Kamu mau masak apa hari ini?</Text>
        </View>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqzSdsROcGXIB-SyqRqmT7PxKY3throkyWHw&s",
          }}
          style={styles.avatar}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Cari Resep makanan"
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabs}
          contentContainerStyle={styles.tabsContent}
        >
          {["Semua", "Jawa Tengah", "Jawa Barat", "Nusantara"].map(
            (label, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.tabButton, i === 0 && styles.tabActive]}
              >
                <Text style={[styles.tabText, i === 0 && styles.tabTextActive]}>
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
        {[
          {
            title: "Mie Aceh",
            rating: 4.5,
            time: "15 Mins",
            img: require("../assets/mie-aceh.jpg"),
          },
          {
            title: "Soto Medan",
            rating: 3.5,
            time: "10 Mins",
            img: require("../assets/soto-medan.jpg"),
          },
          {
            title: "Dadar Padang",
            rating: 4.1,
            time: "10 Mins",
            img: require("../assets/dadar-padang.jpg"),
          },
        ].map((item, i) => (
          <View key={i} style={styles.card}>
            <Image source={item.img} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardTime}>Time {item.time}</Text>
            </View>
            <Text style={styles.cardRating}>★ {item.rating}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>New Recipes</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.newRecipeCard}>
          <Image
            source={require("../assets/rendang.jpg")}
            style={styles.newRecipeImage}
          />
          <View>
            <Text style={styles.newRecipeTitle}>Rendang Kapau</Text>
            <Text style={styles.newRecipeMeta}>By Iqbal Siregar · 20 mins</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <Ionicons name="home" size={24} color="#FF6B6B" />
        <Ionicons name="search" size={24} color="#aaa" />
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  greeting: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
  subGreeting: { color: "#777", marginTop: 5 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginTop: 10 },
  searchContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  filterButton: {
    backgroundColor: "#f67d7d",
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  tabsWrapper: {
    marginBottom: 10,
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
  cardsScroll: { paddingLeft: 20, marginTop: 0 },
  card: {
    width: 140,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    marginRight: 15,
    overflow: "hidden",
  },
  cardImage: { width: "100%", height: 90 },
  cardContent: { padding: 10 },
  cardTitle: { fontWeight: "bold" },
  cardTime: { fontSize: 12, color: "#666" },
  cardRating: {
    position: "absolute",
    top: 5,
    right: 10,
    backgroundColor: "#ffe97a",
    borderRadius: 5,
    padding: 2,
    fontSize: 12,
  },
  sectionTitle: {
    marginHorizontal: 20,
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
  },
  newRecipeCard: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  newRecipeImage: { width: 60, height: 60, borderRadius: 10, marginRight: 10 },
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
