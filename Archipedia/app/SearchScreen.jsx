import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  StyleSheet,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const recipes = [
  {
    id: "1",
    title: "Mie Aceh",
    chef: "Batis Situmorang",
    rating: 4.5,
    time: "15 Menit",
    image: require("../assets/mie-aceh.jpg"),
    region: "Other",
    mealTime: "Makan Malam",
    popular: true,
  },
  {
    id: "2",
    title: "Soto Medan",
    chef: "Herdika Cavellino",
    rating: 3.5,
    time: "11 Menit",
    image: require("../assets/soto-medan.jpg"),
    region: "Other",
    mealTime: "Makan Siang",
    popular: false,
  },
  {
    id: "3",
    title: "Dadar Padang",
    chef: "Jeremy Skena",
    rating: 4.1,
    time: "13 Menit",
    image: require("../assets/dadar-padang.jpg"),
    region: "Other",
    mealTime: "Makan Pagi",
    popular: false,
  },
  {
    id: "4",
    title: "Tahu Gimbal",
    chef: "Batis Situmorang",
    rating: 4.3,
    time: "12 Menit",
    image: require("../assets/tahu-gimbal.jpg"),
    region: "Jawa Tengah",
    mealTime: "Makan Siang",
    popular: false,
  },
  {
    id: "5",
    title: "Garang Asem",
    chef: "Batis Skibidi",
    rating: 4.5,
    time: "12 Menit",
    image: require("../assets/garang-asem.jpg"),
    region: "Jawa Tengah",
    mealTime: "Makan Malam",
    popular: false,
  },
  {
    id: "6",
    title: "Nasi Liwet Solo",
    chef: "Iqbal Ramadhan Karem",
    rating: 4.2,
    time: "18 Menit",
    image: require("../assets/nasi-liwet-solo.jpg"),
    region: "Jawa Tengah",
    mealTime: "Makan Malam",
    popular: false,
  },
  {
    id: "7",
    title: "Lotek",
    chef: "Batis Sumala",
    rating: 4.8,
    time: "14 Menit",
    image: require("../assets/lotek.jpg"),
    region: "Jawa Barat",
    mealTime: "Makan Siang",
    popular: false,
  },
  {
    id: "8",
    title: "Nasi Timbel",
    chef: "Iqbal Ramadhan Karem",
    rating: 5.0,
    time: "15 Menit",
    image: require("../assets/nasi-timbel.jpg"),
    region: "Jawa Barat",
    mealTime: "Makan Siang",
    popular: false,
  },
  {
    id: "9",
    title: "Batagor",
    chef: "Jeremy Skena",
    rating: 4.9,
    time: "18 Menit",
    image: require("../assets/batagor.jpg"),
    region: "Jawa Barat",
    mealTime: "Makan Pagi",
    popular: true,
  },
  {
    id: "10",
    title: "Tahu Campur",
    chef: "Crisitano",
    rating: 4.3,
    time: "12 Menit",
    image: require("../assets/tahu-campur.jpg"),
    region: "Jawa Timur",
    mealTime: "Makan Siang",
    popular: false,
  },
  {
    id: "11",
    title: "Lontong Balap",
    chef: "Juna",
    rating: 3.9,
    time: "20 Menit",
    image: require("../assets/lontong-balap.jpg"),
    region: "Jawa Timur",
    mealTime: "Makan Pagi",
    popular: true,
  },
  {
    id: "12",
    title: "Rawon",
    chef: "Karim Benzema",
    rating: 4.4,
    time: "17 Menit",
    image: require("../assets/rawon.jpg"),
    region: "Jawa Timur",
    mealTime: "Makan Malam",
    popular: false,
  },
];

export default function SearchScreen() {
  const navigation = useNavigation();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    rating4Plus: false,
    category: "Semua",
    mealTime: [],
    popular: false,
  });

  const openFilter = () => setIsFilterVisible(true);
  const closeFilter = () => setIsFilterVisible(false);

  const toggleFilter = (filterType, value) => {
    if (filterType === "rating") {
      setSelectedFilters((prev) => ({
        ...prev,
        rating4Plus: !prev.rating4Plus,
      }));
    } else if (filterType === "category") {
      setSelectedFilters((prev) => ({
        ...prev,
        category: value,
      }));
    } else if (filterType === "mealTime") {
      setSelectedFilters((prev) => ({
        ...prev,
        mealTime: prev.mealTime.includes(value)
          ? prev.mealTime.filter((item) => item !== value)
          : [...prev.mealTime, value],
      }));
    } else if (filterType === "popular") {
      setSelectedFilters((prev) => ({
        ...prev,
        popular: !prev.popular,
      }));
    }
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesRating = selectedFilters.rating4Plus
      ? recipe.rating >= 4.0
      : true;
    const matchesCategory =
      selectedFilters.category === "Semua" ||
      recipe.region === selectedFilters.category;
    const matchesMealTime =
      selectedFilters.mealTime.length === 0 ||
      selectedFilters.mealTime.includes(recipe.mealTime);
    const matchesPopular = selectedFilters.popular ? recipe.popular : true;

    return (
      matchesSearch &&
      matchesRating &&
      matchesCategory &&
      matchesMealTime &&
      matchesPopular
    );
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        if (item.title === "Mie Aceh") {
          navigation.navigate("MieAceh");
        } else if (item.title === "Soto Medan") {
          navigation.navigate("SotoMedan");
        } else if (item.title === "Dadar Padang") {
          navigation.navigate("DadarPadang");
        } else if (item.title === "Tahu Gimbal") {
          navigation.navigate("TahuGimbal");
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
      <ImageBackground
        source={item.image}
        style={styles.cardImage}
        imageStyle={{ borderRadius: 12 }}
      >
        <View style={styles.rating}>
          <Ionicons name="star" color="#FFA500" size={12} />
          <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
        </View>

        <View style={styles.textOverlay}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardChef}>By {item.chef}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Cari Resep</Text>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search recipe"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton} onPress={openFilter}>
          <Ionicons name="options" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isFilterVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeFilter}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Resep</Text>

            <TouchableOpacity
              style={[
                styles.modalButton,
                selectedFilters.rating4Plus && styles.modalButtonActive,
              ]}
              onPress={() => toggleFilter("rating", "rating4Plus")}
            >
              <Text
                style={
                  selectedFilters.rating4Plus && styles.modalButtonTextActive
                }
              >
                Rating 4+
              </Text>
            </TouchableOpacity>

            {["Semua", "Jawa Tengah", "Jawa Barat", "Jawa Timur"].map(
              (category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.modalButton,
                    selectedFilters.category === category &&
                      styles.modalButtonActive,
                  ]}
                  onPress={() => toggleFilter("category", category)}
                >
                  <Text
                    style={
                      selectedFilters.category === category &&
                      styles.modalButtonTextActive
                    }
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              )
            )}

            {["Makan Pagi", "Makan Siang", "Makan Malam"].map((mealTime) => (
              <TouchableOpacity
                key={mealTime}
                style={[
                  styles.modalButton,
                  selectedFilters.mealTime.includes(mealTime) &&
                    styles.modalButtonActive,
                ]}
                onPress={() => toggleFilter("mealTime", mealTime)}
              >
                <Text
                  style={
                    selectedFilters.mealTime.includes(mealTime) &&
                    styles.modalButtonTextActive
                  }
                >
                  {mealTime}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={[
                styles.modalButton,
                selectedFilters.popular && styles.modalButtonActive,
              ]}
              onPress={() => toggleFilter("popular", "popular")}
            >
              <Text
                style={selectedFilters.popular && styles.modalButtonTextActive}
              >
                Terpopuler
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={closeFilter} style={styles.closeButton}>
              <Text style={{ color: "#fff" }}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.sectionLabel}>Pencarian Terbaru</Text>

      <FlatList
        data={filteredRecipes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FFF7",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  filterButton: {
    backgroundColor: "#FF6B6B",
    padding: 10,
    borderRadius: 10,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 100,
  },
  card: {
    width: "47%",
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  cardImage: {
    flex: 1,
    justifyContent: "space-between",
    padding: 8,
  },
  rating: {
    alignSelf: "flex-end",
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: "bold",
  },
  textOverlay: {
    paddingHorizontal: 6,
    paddingBottom: 6,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  cardChef: {
    fontSize: 12,
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalButton: {
    padding: 12,
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    marginBottom: 10,
  },
  modalButtonActive: {
    backgroundColor: "#FF6B6B",
  },
  modalButtonTextActive: {
    color: "#fff",
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: "#FF6B6B",
    padding: 12,
    alignItems: "center",
    borderRadius: 10,
  },
});
