import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Harap isi semua kolom.");
      return;
    }

    const apiUrl = "http://192.168.1.3:5000/api/auth/login";

    try {
      console.log("Sending login data:", { email, password });
      const response = await axios.post(apiUrl, {
        email,
        password,
      });

      const { token, user } = response.data;
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      Alert.alert("Sukses", "Login berhasil!");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Login gagal. Silakan coba lagi."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Halo,</Text>
      <Text style={styles.heading2}>Selamat Datang!</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Masukkan Sandi</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Sandi"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity>
        <Text style={styles.forgot}>Lupa Sandi?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Masuk →</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>───── Masuk Dengan ─────</Text>

      <View style={styles.socialContainer}>
        <Image
          source={require("../assets/googlelogo.png")}
          style={styles.socialIcon}
        />
        <Image
          source={require("../assets/facebooklogo.jpg")}
          style={styles.socialIcon}
        />
      </View>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Tidak Punya Akun?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.signupLink}> Daftar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FFFA",
    padding: 24,
    justifyContent: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "300",
    color: "#14403C",
    fontWeight: "bold",
  },
  heading2: {
    fontSize: 28,
    marginBottom: 30,
    fontWeight: "300",
    color: "#14403C",
  },
  bold: {
    fontWeight: "bold",
  },
  label: {
    color: "#14403C",
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    borderColor: "#D0D0D0",
    borderWidth: 1,
  },
  forgot: {
    color: "#FF7A7A",
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: "#FF7A7A",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
  },
  loginText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  orText: {
    color: "#B0B0B0",
    textAlign: "center",
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 30,
  },
  socialIcon: {
    width: 50,
    height: 50,
  },
  signupContainer: {
    textAlign: "center",
    color: "#222",
    fontWeight: "semibold",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    textAlign: "center",
    color: "#222",
    fontWeight: "semibold",
  },
  signupLink: {
    color: "#FF7A7A",
    align: "center",
  },
});
