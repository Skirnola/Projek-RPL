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

export default function LoginScreen() {
  const navigation = useNavigation();

  console.log("Navigation from useNavigation:", navigation);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Halo,</Text>

      <Text style={styles.heading2}>Selamat Datang!</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="Masukkan Email" />

      <Text style={styles.label}>Masukkan Sandi</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Sandi"
        secureTextEntry
      />

      <TouchableOpacity>
        <Text style={styles.forgot}>Lupa Sandi?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("Home")}
      >
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
