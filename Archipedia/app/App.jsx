import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./WelcomeScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import HomeScreen from "./HomeScreen";
import SearchScreen from "./SearchScreen";
import SavedScreen from "./SavedScreen";
import NotificationScreen from "./NotificationScreen";
import ProfileScreen from "./ProfileScreen";
import MieAceh from "./Makanan/MieAceh";
import SotoMedan from "./Makanan/SotoMedan";
import TahuGimbal from "./Makanan/TahuGimbal";
import DadarPadang from "./Makanan/DadarPadang";
import GarangAsem from "./Makanan/GarangAsem";
import NasiLiwetSolo from "./Makanan/NasiLiwetSolo";
import Lotek from "./Makanan/Lotek";
import NasiTimbel from "./Makanan/NasiTimbel";
import Batagor from "./Makanan/Batagor";
import TahuCampur from "./Makanan/TahuCampur";
import Rawon from "./Makanan/Rawon";
import LontongBalap from "./Makanan/LontongBalap";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Saved" component={SavedScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="MieAceh" component={MieAceh} />
        <Stack.Screen name="SotoMedan" component={SotoMedan} />
        <Stack.Screen name="TahuGimbal" component={TahuGimbal} />
        <Stack.Screen name="DadarPadang" component={DadarPadang} />
        <Stack.Screen name="GarangAsem" component={GarangAsem} />
        <Stack.Screen name="NasiLiwetSolo" component={NasiLiwetSolo} />
        <Stack.Screen name="Lotek" component={Lotek} />
        <Stack.Screen name="NasiTimbel" component={NasiTimbel} />
        <Stack.Screen name="Batagor" component={Batagor} />
        <Stack.Screen name="TahuCampur" component={TahuCampur} />
        <Stack.Screen name="Rawon" component={Rawon} />
        <Stack.Screen name="LontongBalap" component={LontongBalap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
