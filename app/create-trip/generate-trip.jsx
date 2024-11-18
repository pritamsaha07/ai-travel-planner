import { View, Text } from 'react-native'
import LottieView from 'lottie-react-native'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { CreateTripContext } from '../../context/CreateTripContext';
import { AI_PROMPT } from '../../constants/Options';
import { chatSession } from '../../components/AIModal';
import { useRouter } from 'expo-router';
import { setDoc, doc } from 'firebase/firestore'; // Added doc import
import { db, auth } from '../../components/FirebaseConfig';

export default function GenerateTrip() {
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if(tripData) {
      GenerateAiTrips();
    }
  }, [tripData]);

  const GenerateAiTrips = async () => {
    try { 
      setLoading(true);
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', tripData.locationInfo.name)
        .replace('{totalDays}', tripData.totalNoOfDays)
        .replace('{totalNights}', tripData.totalNoOfDays - 1)
        .replace('{traveler}', tripData.traveler.title)
        .replace('{budget}', tripData.budget);

      console.log(FINAL_PROMPT);
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log(result.response.text())
      const tripResponse = JSON.parse(result.response.text());
      
      const docId = Date.now().toString();
      
     
      const tripDocument = {
        userEmail: user.email,
        tripPlan: tripResponse,
        createdAt: new Date().toISOString(), 
        userId: user.uid ,
        
      };

      
      await setDoc(doc(db, "UserTrips", docId), tripDocument);
      
      setLoading(false);
      router.push("(tabs)/MyTrip");
    } catch (error) {
      console.error("Error generating trip:", error);
      setLoading(false);
     
    }
  };

  return (
    <View style={{padding:25, paddingTop:75, backgroundColor:"#fff", height:"100%"}}>
      <Text style={{fontFamily:"outfit-bold", fontSize:35, textAlign:"center"}}>Please Wait...</Text>
      <Text style={{fontFamily:"outfit-medium", fontSize:20, textAlign:"center",marginTop:40}}>
        We are working to generate your dream trip
      </Text>
      
      <LottieView
        source={require('../../assets/Animations/airplane.json')}
        autoPlay
        loop
        style={{width:"100%", height:200}}
      />
      
      <Text style={{fontFamily:"outfit", fontSize:20, textAlign:"center",marginTop:40, color:"gray"}}>
        Do not go back
      </Text>
    </View>
  );
}