import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import YoutubePlayer from "react-native-youtube-iframe";

const RecipeScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Bahan");
  const [isRatingModalVisible, setRatingModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [playing, setPlaying] = useState(false);

  const ingredients = [
    { name: "Ayam", quantity: "500g", icon: "🍗" },
    { name: "Santan Cair", quantity: "1 liter", icon: "🥥" },
    { name: "Santan Kental", quantity: "500ml", icon: "🥥" },
    { name: "Serai", quantity: "2 batang (geprek)", icon: "🌾" },
    { name: "Daun Salam", quantity: "3 lembar", icon: "🌿" },
    { name: "Daun Jeruk", quantity: "3 lembar", icon: "🍃" },
    { name: "Lengkuas", quantity: "2 cm (geprek)", icon: "🪵" },
    { name: "Bawang Merah", quantity: "6 siung", icon: "🧅" },
    { name: "Bawang Putih", quantity: "4 siung", icon: "🧄" },
    { name: "Kunyit", quantity: "2 cm", icon: "🌿" },
    { name: "Jahe", quantity: "2 cm", icon: "🌿" },
    { name: "Ketumbar Sangrai", quantity: "1 sdm", icon: "🌰" },
    { name: "Jinten Sangrai", quantity: "1/2 sdt", icon: "🌱" },
    { name: "Merica Butir", quantity: "1/2 sdt", icon: "⚫" },
    { name: "Kemiri Sangrai", quantity: "2 butir", icon: "🌰" },
    { name: "Garam & Gula", quantity: "secukupnya", icon: "🧂" },
    { name: "Tauge", quantity: "100g", icon: "🌱" },
    { name: "Bihun Jagung", quantity: "2 keping", icon: "🍜" },
    { name: "Telur Rebus", quantity: "2 butir", icon: "🥚" },
    { name: "Kentang Goreng", quantity: "2 buah (iris tipis)", icon: "🥔" },
    { name: "Bawang Goreng", quantity: "secukupnya", icon: "🧅" },
    { name: "Emping", quantity: "secukupnya", icon: "🍘" },
    { name: "Jeruk Nipis", quantity: "1 buah (potong)", icon: "🍋" },
  ];

  const steps = [
    "Rebus ayam hingga matang, angkat dan suwir atau potong-potong, sisihkan kaldu.",
    "Haluskan bawang merah, bawang putih, kunyit, jahe, ketumbar, jinten, merica, dan kemiri.",
    "Tumis bumbu halus bersama serai, daun salam, daun jeruk, dan lengkuas hingga harum.",
    "Masukkan ayam ke dalam tumisan bumbu, aduk rata.",
    "Tuang santan cair dan kaldu ayam, masak hingga mendidih sambil diaduk.",
    "Masukkan santan kental, kecilkan api, masak hingga kuah harum dan bumbu meresap.",
    "Siapkan mangkuk: tata bihun, tauge, ayam, kentang goreng, dan telur rebus.",
    "Siram dengan kuah soto, beri bawang goreng, emping, dan jeruk nipis sebelum disajikan.",
  ];

  const handleStarPress = (value) => {
    setRating(value);
  };

  const handleSubmitRating = () => {
    if (rating > 0) {
      console.log(`Rating submitted: ${rating} stars`);
      setRatingModalVisible(false);
    }
  };

  const togglePlaying = () => {
    setPlaying(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setRatingModalVisible(true)}
          style={styles.threeDots}
        >
          <Text style={styles.threeDotsText}>⋮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={styles.videoContainer}>
          <YoutubePlayer
            height={200}
            videoId="suJOlFDE4ZI"
            play={playing}
            onChangeState={(event) => {
              if (event === "ended") {
                setPlaying(false);
              }
            }}
            initialPlayerParams={{
              controls: true,
              modestbranding: true,
              rel: false,
            }}
            webViewStyle={styles.webView}
          />
          {!playing && (
            <TouchableOpacity
              style={styles.playOverlay}
              onPress={togglePlaying}
            >
              <Text style={styles.playButton}>▶</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Soto Medan</Text>
          <Text style={styles.reviews}>(10K Reviews)</Text>
        </View>
        <View style={styles.authorContainer}>
          <Image
            source={require("../../assets/romok.jpg")}
            style={styles.authorImage}
          />
          <View>
            <Text style={styles.authorName}>Herdika Cavellino</Text>
            <Text style={styles.authorLocation}>Semarang</Text>
          </View>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Ikuti</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "Bahan" ? styles.activeTab : null,
            ]}
            onPress={() => setActiveTab("Bahan")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Bahan" ? styles.activeTabText : null,
              ]}
            >
              Bahan - Bahan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "Proses" ? styles.activeTab : null,
            ]}
            onPress={() => setActiveTab("Proses")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Proses" ? styles.activeTabText : null,
              ]}
            >
              Proses
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "Bahan" ? (
          <View style={styles.contentContainer}>
            {ingredients.map((item, index) => (
              <View key={index} style={styles.ingredientCard}>
                <Text style={styles.ingredientIcon}>{item.icon}</Text>
                <View style={styles.ingredientTextContainer}>
                  <Text style={styles.ingredientName}>{item.name}</Text>
                  <Text style={styles.ingredientQuantity}>{item.quantity}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <View style={styles.serveContainer}>
              <Text style={styles.serveText}>1 Serve</Text>
              <Text style={styles.serveText}>5 Langkah</Text>
            </View>
            {steps.map((step, index) => (
              <View key={index} style={styles.stepContainer}>
                <Text style={styles.stepTitle}>Step {index + 1}</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <Modal
        transparent={true}
        visible={isRatingModalVisible}
        onRequestClose={() => setRatingModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nilai Resep</Text>
            <View style={styles.starContainer}>
              {[1, 2, 3, 4, 5].map((value) => (
                <TouchableOpacity
                  key={value}
                  onPress={() => handleStarPress(value)}
                >
                  <Text
                    style={[styles.star, rating >= value && styles.starFilled]}
                  >
                    ★
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmitRating}
            >
              <Text style={styles.submitButtonText}>Kirim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  fixedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#FFF",
    zIndex: 10,
    marginTop: 40,
  },
  scrollContent: {
    marginTop: 100,
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  threeDots: {
    padding: 5,
  },
  threeDotsText: {
    fontSize: 20,
  },
  videoContainer: {
    width: "90%",
    alignSelf: "center",
    marginHorizontal: 20,
    position: "relative",
    marginTop: 10,
  },
  webView: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  playOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  playButton: {
    fontSize: 50,
    color: "#FFF",
  },
  titleContainer: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  reviews: {
    color: "#888",
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  authorName: {
    fontWeight: "bold",
  },
  authorLocation: {
    color: "#888",
  },
  followButton: {
    marginLeft: "auto",
    backgroundColor: "#FF5A5F",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  followButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#FFD700",
  },
  tabText: {
    fontSize: 16,
    color: "#888",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "bold",
  },
  contentContainer: {
    padding: 10,
  },
  serveContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  serveText: {
    color: "#888",
  },
  ingredientCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ingredientIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  ingredientTextContainer: {
    flex: 1,
    alignItems: "center",
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  ingredientQuantity: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  stepContainer: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  stepTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  stepText: {
    color: "#444",
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
  starContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  star: {
    fontSize: 30,
    color: "#888",
  },
  starFilled: {
    color: "#FF5A5F",
  },
  submitButton: {
    backgroundColor: "#DDD",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    fontSize: 16,
    color: "#000",
  },
});

export default RecipeScreen;
