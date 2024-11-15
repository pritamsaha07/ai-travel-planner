import { View, Text,TouchableOpacity, } from 'react-native'
import React from 'react'
import { useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import SearchPlace from '../../app/create-trip/search-place';
export default function StartNewTripCard() {
    const router = useRouter();
  return (
    <View
    style={{padding:20,marginTop:50,display:"flex", alignItems:"center",gap:25}}>
      <Ionicons name="location-sharp" size={30} color="black" />
      <Text style={{fontSize:25,fontFamily:'outfit-medium'}}>No trips planned yet</Text>
      <Text style={{fontSize:20,fontFamily:'outfit', textAlign:"center", color:"gray"}}>Looks like it's time to plan a new travel experience! Get Started below</Text>
    <TouchableOpacity style={{padding:10, borderRadius:16, backgroundColor:"#000",paddingHorizontal:30}} onPress={()=>router.push('create-trip/search-place')}>
        <Text style={{color:"#fff", fontFamily:"outfit-medium", fontSize:15}}>Start a new trip</Text>
    </TouchableOpacity>
    </View>
  )
}