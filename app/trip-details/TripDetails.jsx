import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { React } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function TripDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const trip = typeof params.trip === 'string' 
    ? JSON.parse(params.trip) 
    : params.trip;
  
  const { tripPlan } = trip;

  const renderFlightDetails = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Flight Details</Text>
      <View style={styles.card}>
        <View style={styles.flightRow}>
          <Ionicons name="airplane" size={24} color="#000" />
          <Text style={styles.flightText}>{tripPlan.flightDetails.airline}</Text>
        </View>
        <Text style={styles.flightSubText}>Flight: {tripPlan.flightDetails.flightNumber}</Text>
        <View style={styles.divider} />
        <View style={styles.timeRow}>
          <View>
            <Text style={styles.timeLabel}>Departure</Text>
            <Text style={styles.timeText} >{tripPlan.flightDetails.departure}</Text>
          </View>
          <View>
            <Text style={styles.timeLabel}>Arrival</Text>
            <Text style={styles.timeText}>{tripPlan.flightDetails.arrival}</Text>
          </View>
        </View>
        <Text style={styles.priceText}>Price: {tripPlan.flightDetails.price}</Text>
      </View>
    </View>
  );

  const renderHotels = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Hotels</Text>
      {tripPlan.hotels.map((hotel, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.hotelName}>{hotel.hotelName}</Text>
          <Text style={styles.hotelAddress}>{hotel.hotelAddress}</Text>
        </View>
      ))}
    </View>
  );
  const renderDayPlan = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Day-wise Itinerary</Text>
      {tripPlan.days.map((dayItem, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.dayTitle}>Day {dayItem.day}</Text>
          {dayItem.locations.map((location, idx) => (
            <View key={idx} style={styles.activityContainer}>
              <Text style={styles.activityText}>{location.name}</Text>
              <Text style={styles.activityTime}>{location.placeDetails}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );

 
  if (!trip || !tripPlan) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Loading trip details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{tripPlan.tripName}</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: tripPlan.destinationImageUrl }}
          style={styles.destinationImage}
        />
        
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Best Time to Visit:</Text>
            <Text style={styles.infoText}>{tripPlan.bestTimetoVisit}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Budget Category:</Text>
            <Text style={styles.infoText}>{tripPlan.budget}</Text>
          </View>
        </View>

        {renderFlightDetails()}
        {renderHotels()}
        {renderDayPlan()}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
    marginLeft: 15,
  },
  destinationImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'outfit-bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  flightText: {
    fontSize: 18,
    marginLeft: 10,
    fontFamily: 'outfit-medium',
  },
  flightSubText: {
    color: '#666',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  timeRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  timeLabel: {
    color: '#666',
    marginBottom: 5,
  },
  timeText: {
    fontSize: 16,
    fontFamily: 'outfit-medium',
  },
  priceText: {
    fontSize: 16,
    color: '#2E8B57',
    fontFamily: 'outfit-medium',
  },
  hotelName: {
    fontSize: 18,
    fontFamily: 'outfit-medium',
    marginBottom: 5,
  },
  hotelAddress: {
    color: '#666',
    marginBottom: 5,
  },
  hotelPrice: {
    color: '#2E8B57',
    fontFamily: 'outfit-medium',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  amenityTag: {
    backgroundColor: '#f0f0f0',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 12,
  },
  dayTitle: {
    fontSize: 18,
    fontFamily: 'outfit-bold',
    marginBottom: 10,
  },
  activityContainer: {
    marginBottom: 10,
  },
  activityTime: {
    color: '#666',
    marginBottom: 2,
  },
  activityText: {
    fontSize: 16,
  },
  infoContainer: {
    padding: 15,
    backgroundColor: '#f8f8f8',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  infoLabel: {
    fontFamily: 'outfit-medium',
    marginRight: 5,
  },
  infoText: {
    color: '#666',
  },
});