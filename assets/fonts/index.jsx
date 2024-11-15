import { Text, View } from "react-native";
import Login from "../components/Login";
import { auth } from "../components/FirebaseConfig";
import { Redirect } from "expo-router";
import MyTrip from "./(tabs)/MyTrip";
import SignIn from "./auth/sign-in"
export default function Index() {
  const user = auth.currentUser;
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <SignIn/>
      {/* {user ? <Redirect href={"./(tabs)/MyTrip"} /> : <Login />} */}
    </View>
  );
}
