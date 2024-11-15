import { View, Text,TouchableOpacity, } from 'react-native'
import {React,useState} from 'react'

import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';

export default function MyTrip() {

  const [userTrips,setUserTrips]=useState([]);
  return (
    <View style={{backgroundColor:"#fff",height:"100%", width:"100%",padding:25}}>
      
      <View style={{flexDirection:"row",alignItems:"center", justifyContent:"space-between",
      }}>
      <Text style={{color:"#000", marginTop:30,fontSize:35,fontFamily:'outfit-bold'}}>My Trips</Text>
      <Ionicons name="add-circle-sharp" size={50} color="black" style={{marginTop:30}}/>
      </View>

      {userTrips?.length==0?
      <StartNewTripCard/>:null}
    </View>
  )
}