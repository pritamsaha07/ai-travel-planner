import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useEffect,useState,useContext } from 'react';
import { useNavigation } from 'expo-router';
import { FlatList } from 'react-native';
import { CreateTripContext } from '../../context/CreateTripContext';
import { SelectTravelesList } from '../../constants/Options';
import OptionCard from '../../components/CreateTrip/OptionCard';
export default function selectTraveler() {
    const navigation = useNavigation();

    const [selectedTraveler,seSeletedTraveler]=useState();
    const { tripData, setTripData } = useContext(CreateTripContext);
    useEffect(() => {
        navigation.setOptions({
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
        });
      }, []);
      useEffect(() => {
        console.log(tripData);
      }, [tripData]);
    
      useEffect(()=>{
         setTripData({...tripData,
            traveler:selectedTraveler
         })
      },[selectedTraveler])
  return (
    <View style={{
        padding:25,
        paddingTop:45,
        backgroundColor:"#fff",
        height:"100%"
    }}>
      <Text style={{fontSize:30, fontFamily:"outfit-bold", marginTop:20}}>Who's Traveling</Text>

      <View>
        <Text style={{ fontFamily:'outfit-bold', fontSize:23, marginTop:10 }}>Choose your traveles </Text>
        <FlatList data={SelectTravelesList}
        renderItem={({item,index})=>(
            <TouchableOpacity onPress={()=>seSeletedTraveler(item)}style={{marginVertical:10}}>
                <OptionCard option={item} selectedTraveler={selectedTraveler}/>
            </TouchableOpacity>
        )}/>
      </View>

      <TouchableOpacity style={{
        padding:15, backgroundColor:"#000", borderRadius:16,marginTop:30
      }}>
        <Text style={{textAlign:"center", color:"#fff",fontFamily:"outfit"}}>Continue</Text>
      </TouchableOpacity>
    </View>
  )
}