import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const NotificationCard = ({ title, subtitle, time, read }) => (
  <View style={[styles.card, !read && styles.cardUnread]}>
    <View style={styles.cardContent}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      <View style={styles.iconWrapper}>
        <Ionicons name="document-text-outline" size={20} color="#fff" />
      </View>
    </View>
  </View>
);

export default function NotificationScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Semua");

  const notifications = [
    {
      title: "Peringatan Resep Baru!",
      subtitle: "Adanya resep baru oleh Chef Azril",
      time: "10 menit yang lalu",
      read: true,
      section: "Hari Ini",
    },
    {
      title: "Peringatan Resep Baru!",
      subtitle: "Adanya resep baru oleh Chef Azril",
      time: "30 menit yang lalu",
      read: false,
      section: "Hari Ini",
    },
    {
      title: "Peringatan Resep Baru!",
      subtitle: "Adanya resep baru oleh Chef Azril",
      time: "30 menit yang lalu",
      read: true,
      section: "Hari Ini",
    },
    {
      title: "Peringatan Resep Baru!",
      subtitle: "Peringatan adanya resep baru yang",
      time: "10 menit yang lalu",
      read: false,
      section: "Kemarin",
    },
    {
      title: "Peringatan Resep Baru!",
      subtitle: "Adanya resep baru oleh Chef Azril",
      time: "30 menit yang lalu",
      read: true,
      section: "Kemarin",
    },
  ];

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "Semua") return true;
    if (activeTab === "Terbaca") return notification.read;
    if (activeTab === "Belum Dibaca") return !notification.read;
    return true;
  });

  const groupedNotifications = {
    "Hari Ini": filteredNotifications.filter((n) => n.section === "Hari Ini"),
    Kemarin: filteredNotifications.filter((n) => n.section === "Kemarin"),
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifikasi</Text>
      </View>

      <View style={styles.tabContainer}>
        {["Semua", "Terbaca", "Belum Dibaca"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab ? styles.tabTextActive : null,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView>
        {groupedNotifications["Hari Ini"].length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Hari Ini</Text>
            {groupedNotifications["Hari Ini"].map((notification, index) => (
              <NotificationCard
                key={`today-${index}`}
                title={notification.title}
                subtitle={notification.subtitle}
                time={notification.time}
                read={notification.read}
              />
            ))}
          </>
        )}
        {groupedNotifications["Kemarin"].length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Kemarin</Text>
            {groupedNotifications["Kemarin"].map((notification, index) => (
              <NotificationCard
                key={`yesterday-${index}`}
                title={notification.title}
                subtitle={notification.subtitle}
                time={notification.time}
                read={notification.read}
              />
            ))}
          </>
        )}
      </ScrollView>

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
          <Ionicons name="notifications" size={24} color="#FF6B6B" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person" size={24} color="#aaa" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FFF6",
    paddingHorizontal: 16,
    paddingTop: 48,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
    marginTop: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
    alignItems: "center",
  },
  tabButton: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#F44F5A",
  },
  tabTextActive: {
    color: "#F44F5A",
  },
  tabActive: {
    backgroundColor: "#FFE457",
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 12,
  },
  card: {
    backgroundColor: "#F0FFF0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardUnread: {
    backgroundColor: "#E8F0E8",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    color: "#888",
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: "#aaa",
  },
  iconWrapper: {
    backgroundColor: "#FFBB56",
    padding: 8,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
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
