import { View, Text,TouchableOpacity, ActivityIndicator,ScrollView } from 'react-native'
import {React,useEffect,useState} from 'react'
import TripCard from '../../components/TripsCard';
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { collection, query, where, getDocs } from "firebase/firestore";
import {db,auth} from "../../components/FirebaseConfig";
import { useRouter } from 'expo-router';
export default function MyTrip() {
  const router = useRouter();
  const [userTrips,setUserTrips]=useState([]);
  const user=auth.currentUser;
  const [loading,setLoading]=useState(false)
  useEffect(()=>{
    GetMyTrips();
  },[user])
  const GetMyTrips=async()=>{
    setLoading(true);
    setUserTrips([])
    const q=query(collection(db,'UserTrips'),where('userEmail', '==',user.email));
    const querySnapshot = await getDocs(q);
   querySnapshot.forEach((doc) => {
  
  console.log(doc.id, " => ", doc.data());
  setUserTrips(prev=>[...prev,doc.data()])
});


setLoading(false);
  }
  return (
    <View style={{backgroundColor:"#fff",height:"100%", width:"100%",padding:25}}>
      
      <View style={{flexDirection:"row",alignItems:"center", justifyContent:"space-between",
      }}>
      <Text style={{color:"#000", marginTop:30,fontSize:35,fontFamily:'outfit-bold'}}>My Trips</Text>
      <Ionicons name="add-circle-sharp" size={50} color="black" style={{marginTop:30}} onPress={()=>router.push('create-trip/search-place')}/>
      </View>
      {loading && <ActivityIndicator size={'large'} color={"#000"}/>}
      {userTrips?.length==0?
      <StartNewTripCard/>:null}

{userTrips?.length > 0 && (
  <ScrollView showsVerticalScrollIndicator={false}>
    {userTrips.map((trip, index) => (
      <TouchableOpacity onPress={() => router.push({
        pathname: 'trip-details/TripDetails',
        params: { trip:JSON.stringify(trip)}
      })}>
      <TripCard key={index} trip={trip} />
      </TouchableOpacity>

    ))}
  </ScrollView>
)}
    </View>
  )
}