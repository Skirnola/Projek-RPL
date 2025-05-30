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
    title: "Nasi Iga Bakar",
    chef: "Chef John",
    rating: 4.0,
    image: require("../assets/soto-medan.jpg"),
  },
  {
    id: "2",
    title: "Rendang Kambing",
    chef: "Spicy Nelly",
    rating: 4.0,
    image: require("../assets/dadar-padang.jpg"),
  },
  {
    id: "3",
    title: "Ayam Betutu",
    chef: "Mark Kelvin",
    rating: 4.0,
    image: require("../assets/soto-medan.jpg"),
  },
  {
    id: "4",
    title: "Nasi Goreng Jawa",
    chef: "Batis Situmorang",
    rating: 4.0,
    image: require("../assets/dadar-padang.jpg"),
  },
  {
    id: "5",
    title: "Nasi Iga Bakar",
    chef: "Chef John",
    rating: 4.0,
    image: require("../assets/soto-medan.jpg"),
  },
  {
    id: "6",
    title: "Rendang Kambing",
    chef: "Spicy Nelly",
    rating: 4.0,
    image: require("../assets/dadar-padang.jpg"),
  },
  {
    id: "7",
    title: "Ayam Betutu",
    chef: "Mark Kelvin",
    rating: 4.0,
    image: require("../assets/soto-medan.jpg"),
  },
  {
    id: "8",
    title: "Nasi Goreng Jawa",
    chef: "Batis Situmorang",
    rating: 4.0,
    image: require("../assets/dadar-padang.jpg"),
  },
];

export default function SearchScreen() {
  const navigation = useNavigation();
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const openFilter = () => setIsFilterVisible(true);
  const closeFilter = () => setIsFilterVisible(false);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
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
        <TextInput placeholder="Search recipe" style={styles.searchInput} />
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

            <TouchableOpacity style={styles.modalButton}>
              <Text>Rating 4+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton}>
              <Text>Makanan Pedas</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={closeFilter} style={styles.closeButton}>
              <Text style={{ color: "#fff" }}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.sectionLabel}>Pencarian Terbaru</Text>

      <FlatList
        data={recipes}
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
  closeButton: {
    marginTop: 16,
    backgroundColor: "#FF6B6B",
    padding: 12,
    alignItems: "center",
    borderRadius: 10,
  },
});
