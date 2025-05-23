import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const NotificationCard = ({ title, subtitle, time }) => (
  <View style={styles.card}>
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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifikasi</Text>
      </View>

      <View style={styles.tabContainer}>
        <Text style={[styles.tabText, { color: "#F44F5A" }]}>Semua</Text>
        <Text style={[styles.tabText, { color: "#F44F5A" }]}>Terbaca</Text>
        <Text style={[styles.tabText, { color: "#F44F5A" }]}>Belum Dibaca</Text>
      </View>

      <ScrollView>
        <Text style={styles.sectionTitle}>Today</Text>
        <NotificationCard
          title="Peringatan Resep Baru!"
          subtitle="Peringatan adanya resep baru yang dibuat oleh Chef Azril"
          time="10 menit yang lalu"
        />
        <NotificationCard
          title="Peringatan Resep Baru!"
          subtitle="Peringatan adanya resep baru yang dibuat oleh Chef Azril"
          time="30 menit yang lalu"
        />
        <NotificationCard
          title="Peringatan Simpan Resep!"
          subtitle="Peringatan adanya resep baru yang dibuat oleh Chef Azril"
          time="30 menit yang lalu"
        />

        <Text style={styles.sectionTitle}>Kemarin</Text>
        <NotificationCard
          title="Peringatan Resep Baru!"
          subtitle="Peringatan adanya resep baru yang dibuat oleh Chef Azril"
          time="10 menit yang lalu"
        />
        <NotificationCard
          title="Peringatan Resep Baru!"
          subtitle="Peringatan adanya resep baru yang dibuat oleh Chef Azril"
          time="30 menit yang lalu"
        />
      </ScrollView>
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
  tabText: {
    fontSize: 13,
    fontWeight: "bold",
    justifyContent: "center",
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
});
