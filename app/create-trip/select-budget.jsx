import { View, Text,TouchableOpacity ,FlatList} from 'react-native'
import React from 'react'
import { useEffect,useState,useContext } from 'react';
import { useRouter, useNavigation } from 'expo-router';
import { SelectBudgetOptions } from '../../constants/Options';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { CreateTripContext } from '../../context/CreateTripContext';
export default function SelectBudget() {
    const navigation = useNavigation();
    const router = useRouter();
    const [selectedBudget,setSeletedBudget]=useState();
    const { tripData, setTripData } = useContext(CreateTripContext);
    useEffect(() => {
        navigation.setOptions({
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
        });
      }, []);
      const onPressContinue=()=>{
        setTripData({
            ...tripData,
            budget:selectedBudget.title
         })
         router.push("create-trip/review-trip")
      }

      useEffect(() => {
        // console.log(tripData);
      }, [tripData]);
  return (
    <View style={{
        padding:25,
        paddingTop:45,
        backgroundColor:"#fff",
        height:"100%"
    }}>
      <Text style={{fontSize:30, fontFamily:"outfit-bold", marginTop:20}}>Budget</Text>

      <View>
        <Text style={{ fontFamily:'outfit-bold', fontSize:23, marginTop:10 }}>Choose spending habits for your trip </Text>
        <FlatList data={SelectBudgetOptions}
        renderItem={({item,index})=>(
            <TouchableOpacity style={{marginVertical:10}} onPress={()=>setSeletedBudget(item)}>
                <OptionCard option={item} selectedOptions={selectedBudget}/>
            </TouchableOpacity>
        )}/>
     
      </View>

      <TouchableOpacity style={{
        padding:15, backgroundColor:"#000", borderRadius:16,marginTop:30
      }} onPress={onPressContinue}>
        <Text style={{textAlign:"center", color:"#fff",fontFamily:"outfit"}}>Continue</Text>
      </TouchableOpacity>
    </View>
  )
}