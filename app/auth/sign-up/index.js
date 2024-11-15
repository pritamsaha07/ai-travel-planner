import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import AntDesign from "@expo/vector-icons/AntDesign";
import { auth } from "../../../components/FirebaseConfig";
export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [fullname, setFullName] = useState();
  const onCreateAccount = () => {
    if (!email && !password && !fullname) {
      ToastAndroid.show("Please enter all details", ToastAndroid.BOTTOM);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        router.replace("../../(tabs)/MyTrip");
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
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
        Create New Account
      </Text>
      <View style={{ paddingHorizontal: 15 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
          Full Name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Full Name"
          onChangeText={(value) => setFullName(value)}
        ></TextInput>
        <Text
          style={{ fontFamily: "outfit-bold", fontSize: 20, marginTop: 10 }}
        >
          Email
        </Text>

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
          onPress={onCreateAccount}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontFamily: "outfit-bold",
            }}
          >
            Create Account
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
