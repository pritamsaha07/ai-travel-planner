import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import CalendarPicker from "react-native-calendar-picker";
import { CreateTripContext } from '../../context/CreateTripContext';
import moment from 'moment'
import { useRouter } from 'expo-router';
export default function SelectDates() {
    const navigation = useNavigation();
    const router = useRouter();
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const { tripData, setTripData } = useContext(CreateTripContext);
    useEffect(() => {
        navigation.setOptions({
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
        });
    }, []);
    
    const onDateChange = (date, type) => {
        if (type === 'END_DATE') {
            setSelectedEndDate(moment(date));
        } else {
            setSelectedStartDate(moment(date));
            setSelectedEndDate(null);
        }
    };

    const OnDateSelectionContinue=()=>{
        if(!selectedStartDate&&!selectedEndDate){
            ToastAndroid.show('Please select Start and End Date',ToastAndroid.LONG);
            return;
        }
         const totalNoOfDays=selectedEndDate.diff(selectedStartDate,'days')+1;
        //  console.log(totalNoOfDays)
         setTripData({
            ...tripData,
            startDate:selectedStartDate,
            endDate:selectedEndDate,
            totalNoOfDays:totalNoOfDays
         })

         router.push("create-trip/select-budget")
    }

    return (
        <View style={{padding:25, paddingTop:75, backgroundColor:"#fff", height:"100%"}}>
            <Text style={{
                fontFamily:"outfit-bold",
                fontSize:35,
            }}>Travel Dates</Text>
            <View style={{
                marginTop:30
            }}>
                <CalendarPicker 
                    onDateChange={onDateChange}
                    allowRangeSelection={true}
                    selectedStartDate={selectedStartDate}
                    selectedEndDate={selectedEndDate}
                    minDate={new Date()}
                    selectedRangeStyle={{backgroundColor:"#000"}}
                    selectedDayTextStyle={{
                        color:"#fff"
                    }}
                    textStyle={{fontFamily:"outfit-bold"}}
                />
            </View>
            <TouchableOpacity style={{
        padding:15, backgroundColor:"#000", borderRadius:16,marginTop:30
      }} onPress={OnDateSelectionContinue} >
        <Text style={{textAlign:"center", color:"#fff",fontFamily:"outfit"}}>Continue</Text>
      </TouchableOpacity>
        </View>
    );
}