import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import {CreateTripContext} from "../context/CreateTripContext"
import { useState } from "react";
export default function RootLayout() {
  useFonts({
    outfit: require("./..//assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./..//assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("./..//assets/fonts/Outfit-Bold.ttf"),
  });

  const [tripData,setTripData]=useState([]);
  return (
    <CreateTripContext.Provider value={{tripData,setTripData}}>
    <Stack screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="auth/sign-in/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="auth/sign-up/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="(tabs)/MyTrip" options={{ headerShown: false }} />
      <Stack.Screen
        name="create-trip/search-place"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="create-trip/select-traveler"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="create-trip/select-dates"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="create-trip/select-budget"
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="create-trip/review-trip"
        options={{ headerShown: false }}
      />

    </Stack>
    </CreateTripContext.Provider>
  );
}
