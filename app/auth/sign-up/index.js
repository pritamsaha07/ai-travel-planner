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
import { createUserWithEmailAndPassword } from "firebase/auth";
import AntDesign from "@expo/vector-icons/AntDesign";
import { auth } from "../../../components/FirebaseConfig";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.LONG);
  };

  const validateInputs = () => {
    if (!email || !password || !fullname) {
      showToast("Please fill in all fields");
      return false;
    }
    if (fullname.trim().length < 2) {
      showToast("Please enter a valid name");
      return false;
    }
    if (password.length < 6) {
      showToast("Password should be at least 6 characters");
      return false;
    }
    return true;
  };

  const onCreateAccount = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const user = userCredential.user;
      // console.log(user);
      router.replace("../../(tabs)/MyTrip");
    } catch (error) {
      console.error("Sign up error:", error);
      showToast("An account already exists with this email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
        disabled={loading}
      >
        <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.headerText}>Create New Account</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Full Name"
          onChangeText={setFullName}
          value={fullname}
          editable={!loading}
        />

        <Text style={[styles.labelText, styles.spacing]}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
        />

        <Text style={[styles.labelText, styles.spacing]}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          autoCapitalize="none"
          editable={!loading}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.createButton, loading && styles.disabledButton]}
          onPress={onCreateAccount}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.createButtonText}>Create Account</Text>
          )}
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
  spacing: {
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
  createButton: {
    padding: 15,
    width: "80%",
    backgroundColor: "#000",
    borderRadius: 15,
    marginTop: 40,
    height: 55,
    justifyContent: "center",
  },
  disabledButton: {
    opacity: 0.7,
  },
  createButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "outfit-bold",
  },
});
