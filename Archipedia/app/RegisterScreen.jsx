import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Buat akun</Text>
      <Text style={styles.subheading}>
        Mari kami bantu Anda menyiapkan akun, tidak akan memakan waktu lama.
      </Text>

      <TextInput placeholder="Masukkan Nama" style={styles.input} />
      <TextInput placeholder="Masukkan Email" style={styles.input} />
      <TextInput
        placeholder="Masukkan Sandi"
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Tulis Ulang Sandi"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.agreementContainer}
        onPress={() => setIsAgreed(!isAgreed)}
      >
        <View style={[styles.box, isAgreed && styles.boxChecked]} />
        <Text style={styles.agreementText}>Terima syarat & ketentuan</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Daftar</Text>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>Masuk Dengan</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialContainer}>
        <TouchableOpacity>
          <Image
            source={require("../assets/googlelogo.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../assets/facebooklogo.jpg")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        Sudah Punya Akun?{" "}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          Masuk
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fdf9",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#003d29",
    marginTop: "100",
  },
  subheading: {
    fontSize: 14,
    color: "#5c5c5c",
    marginBottom: 20,
  },
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  agreementContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  box: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: "#000",
    marginRight: 10,
    borderRadius: 3,
  },
  boxChecked: {
    backgroundColor: "#000",
  },
  agreementText: {
    fontSize: 14,
    color: "#333",
  },
  registerButton: {
    backgroundColor: "#ffe66d",
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  registerButtonText: {
    color: "#ff5a5f",
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 6,
  },
  arrow: {
    fontSize: 18,
    color: "#ff5a5f",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 12,
    color: "#999",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 20,
  },
  socialIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  footerText: {
    textAlign: "center",
    color: "#000",
  },
  loginLink: {
    color: "#ff5a5f",
    fontWeight: "bold",
  },
});
