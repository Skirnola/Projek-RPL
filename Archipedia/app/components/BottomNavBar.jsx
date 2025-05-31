import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BottomNavBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
  );
};

const styles = StyleSheet.create({
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

export default BottomNavBar;
