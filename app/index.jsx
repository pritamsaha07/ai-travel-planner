import { Text, View } from "react-native";
import Login from "../components/Login";
import { db, auth } from "../components/FirebaseConfig";
import { Redirect } from "expo-router";
import { useState, useEffect } from "react";

export default function Index() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
   
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    
    
    return subscriber;
  }, []);

 
  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'outfit-medium' }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {user ? <Redirect href="/(tabs)/MyTrip" /> : <Login />}
    </View>
  );
}