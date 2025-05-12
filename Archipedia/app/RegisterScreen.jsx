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

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Buat Akun</Text>
    </View>
  );
}
