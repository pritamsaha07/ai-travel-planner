import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { CreateTripContext } from '../../context/CreateTripContext';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';

export default function ReviewTrip() {
    const navigation = useNavigation();
    const { tripData, setTripData } = useContext(CreateTripContext);
    const [searchValue, setSearchValue] = useState('');
    const router = useRouter();

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        });
    }, []);

    return (
        <View style={{
            padding: 25,
            paddingTop: 45,
            backgroundColor: "#fff",
            height: "100%"
        }}>
            <Text style={{fontSize: 30, fontFamily: "outfit-bold", marginTop: 20}}>
                Review your Trip
            </Text>
            <Text style={{fontFamily: 'outfit-bold', fontSize: 23, marginTop: 10}}>
                Before generating your trip, please review your selection
            </Text>

            <View style={{gap: 15, marginTop: 25}}>
               
                <View style={styles.infoBox}>
                    <View style={styles.iconContainer}>
                        <FontAwesome6 name="location-dot" size={24} color="#2b2b2b" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.label}>Destination</Text>
                        <Text style={styles.value}>{tripData.locationInfo.name}</Text>
                    </View>
                </View>

                
                <View style={styles.infoBox}>
                    <View style={styles.iconContainer}>
                        <FontAwesome6 name="calendar" size={24} color="#2b2b2b" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.label}>Dates</Text>
                        <Text style={styles.value}>
                            {formatDate(tripData.startDate)} - {formatDate(tripData.endDate)}
                        </Text>
                        <Text style={styles.subValue}>{tripData.totalNoOfDays} days</Text>
                    </View>
                </View>

                
                <View style={styles.infoBox}>
                    <View style={styles.iconContainer}>
                        <FontAwesome6 name="users" size={24} color="#2b2b2b" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.label}>Who's Going</Text>
                        <Text style={styles.value}>{tripData.traveler.title}</Text>
                        <Text style={styles.subValue}>{tripData.traveler.people}</Text>
                    </View>
                </View>

               
                <View style={styles.infoBox}>
                    <View style={styles.iconContainer}>
                        <FontAwesome6 name="wallet" size={24} color="#2b2b2b" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.label}>Budget</Text>
                        <Text style={styles.value}>{tripData.budget}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={{
        padding:15, backgroundColor:"#000", borderRadius:16,marginTop:30
      }} onPress={()=>router.push("create-trip/generate-trip")}>
        <Text style={{textAlign:"center", color:"#fff",fontFamily:"outfit"}}>Build My Trip</Text>
      </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    infoBox: {
        padding: 16,
        backgroundColor: "#e3e8e5",
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 15
    },
    iconContainer: {
        width: 45,
        height: 45,
        backgroundColor: "#fff",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center"
    },
    textContainer: {
        flex: 1
    },
    label: {
        fontSize: 14,
        color: "#666",
        fontFamily: "outfit-medium"
    },
    value: {
        fontSize: 16,
        color: "#2b2b2b",
        fontFamily: "outfit-bold",
        marginTop: 2
    },
    subValue: {
        fontSize: 14,
        color: "#666",
        fontFamily: "outfit-medium",
        marginTop: 2
    }
});