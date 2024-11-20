import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { React, useEffect, useState } from 'react';
import TripCard from '../../components/TripsCard';
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../components/FirebaseConfig";
import { useRouter } from 'expo-router';
import { signOut } from "firebase/auth";

export default function MyTrip() {
  const router = useRouter();
  const [userTrips, setUserTrips] = useState([]);
  const user = auth.currentUser;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetMyTrips();
  }, [user]);

  const GetMyTrips = async () => {
    setLoading(true);
    setUserTrips([]);
    try {
      const q = query(collection(db, 'UserTrips'), where('userEmail', '==', user.email));
      const querySnapshot = await getDocs(q);
      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (tripId) => {
    setUserTrips(prev => prev.filter(trip => trip.id !== tripId));
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('auth/sign-in');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <View style={{ backgroundColor: "#fff", height: "100%", width: "100%", padding: 25 }}>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 30,
        marginBottom: 20
      }}>
        <View>
          <Text style={{
            color: "#000",
            fontSize: 35,
            fontFamily: 'outfit-bold'
          }}>My Trips</Text>
          <Text style={{
            color: "#666",
            fontSize: 14,
            fontFamily: 'outfit',
          }}>{user?.email}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
          <TouchableOpacity onPress={() => router.push('create-trip/search-place')}>
            <Ionicons name="add-circle-sharp" size={50} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              padding: 8,
              backgroundColor: '#f0f0f0',
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5
            }}>
            <Ionicons name="log-out-outline" size={20} color="black" />
            <Text style={{ fontFamily: 'outfit-medium', fontSize: 14 }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading && <ActivityIndicator size={'large'} color={"#000"} />}

      {userTrips?.length === 0 && !loading ? <StartNewTripCard /> : null}

      {userTrips?.length > 0 && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {userTrips.map((trip) => (
            <TouchableOpacity
              key={trip.id}
              onPress={() => router.push({
                pathname: 'trip-details/TripDetails',
                params: { trip: JSON.stringify(trip) }
              })}>
              <TripCard 
                trip={trip} 
                tripId={trip.id}
                onDelete={handleDelete}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}