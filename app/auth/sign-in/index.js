import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import MyTrips from "../../(tabs)/MyTrip";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../../components/FirebaseConfig";
export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onSignIn = () => {
    if (!email && !password) {
      ToastAndroid.show("Please enter all details", ToastAndroid.BOTTOM);
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        router.push("../../(tabs)/MyTrip");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == "auth/invalid-credentials") {
          ToastAndroid.show("Invalid Credentials", ToastAndroid.LONG);
        }
      });
  };
  return (
    <View
      style={{ backgroundColor: "#fff", height: "100%", paddingHorizontal: 10 }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <AntDesign
          name="left"
          size={24}
          color="black"
          style={{ marginTop: 40 }}
        />
      </TouchableOpacity>

      <Text
        style={{
          justifyContent: "center",
          fontSize: 30,
          fontFamily: "outfit-bold",
          padding: 15,
          marginTop: 20,
        }}
      >
        Let's Sign You In
      </Text>
      <View style={{ paddingHorizontal: 15 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>Email</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          onChangeText={(value) => setEmail(value)}
        ></TextInput>

        <Text
          style={{ fontFamily: "outfit-bold", fontSize: 20, marginTop: 10 }}
        >
          Password
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          onChangeText={(value) => setPassword(value)}
        ></TextInput>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={{
            padding: 15,
            width: "80%",
            backgroundColor: "#000",
            borderRadius: 15,
            marginTop: 40,
          }}
          onPress={onSignIn}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontFamily: "outfit-bold",
            }}
          >
            SignIn
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 15,
            width: "80%",
            backgroundColor: "#fff",
            borderRadius: 15,
            marginTop: 20,
            borderWidth: 1,
            borderColor: "#000",
          }}
          onPress={() => router.replace("auth/sign-up")}
        >
          <Text
            style={{
              color: "#000",
              textAlign: "center",
              fontFamily: "outfit-bold",
            }}
          >
            SignUp
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 20,
    marginTop: 10,
  },
});
