// Import the required dependencies
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEdHKAavPspc2GSPQYiGEkcv6yDgDNQVk",
  authDomain: "ai-travel-planner-a1826.firebaseapp.com",
  projectId: "ai-travel-planner-a1826",
  storageBucket: "ai-travel-planner-a1826.firebasestorage.app",
  messagingSenderId: "1075924828036",
  appId: "1:1075924828036:web:36d8a14f7711af5dec67d1",
  measurementId: "G-X0Q1G1C650"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});