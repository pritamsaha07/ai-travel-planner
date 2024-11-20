import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../components/FirebaseConfig";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.LONG);
  };

  const validateInputs = () => {
    if (!email && !password) {
      showToast("Please enter email and password");
      return false;
    }
    if (!email) {
      showToast("Please enter email");
      return false;
    }
    if (!password) {
      showToast("Please enter password");
      return false;
    }
    return true;
  };

  const onSignIn = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const user = userCredential.user;
      // console.log(user);
      router.push("../../(tabs)/MyTrip");
    } catch (error) {
      console.error("Sign in error:", error);
      showToast("Sign in failed. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.headerText}>Let's Sign You In</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={[styles.labelText, styles.passwordLabel]}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={onSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.signInButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => router.replace("auth/sign-up")}
          disabled={loading}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    paddingHorizontal: 10,
  },
  backButton: {
    marginTop: 40,
  },
  headerText: {
    fontSize: 30,
    fontFamily: "outfit-bold",
    padding: 15,
    marginTop: 20,
  },
  inputContainer: {
    paddingHorizontal: 15,
  },
  labelText: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  passwordLabel: {
    marginTop: 10,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 20,
    marginTop: 10,
    fontSize: 14,
  },
  buttonContainer: {
    alignItems: "center",
  },
  signInButton: {
    padding: 15,
    width: "80%",
    backgroundColor: "#000",
    borderRadius: 15,
    marginTop: 40,
    height: 55,
    justifyContent: "center",
  },
  signInButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "outfit-bold",
  },
  signUpButton: {
    padding: 15,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#000",
  },
  signUpButtonText: {
    color: "#000",
    textAlign: "center",
    fontFamily: "outfit-bold",
  },
});
