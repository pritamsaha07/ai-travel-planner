import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { React, useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Linking } from 'react-native';


export default function TripDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [destinationImage, setDestinationImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dayPlanImages, setDayPlanImages] = useState({});
  const UNSPLASH_ACCESS_KEY = 'F0Q3Vk1weskGphZDwqp26moxfLbEqZTh7zTjMlmlD_Y';

  const getTruncatedName = (name) => {
    if (!name) return '';
    return name.slice(0, 10);
  };

  const trip = typeof params.trip === 'string' 
    ? JSON.parse(params.trip) 
    : params.trip;
  const { tripPlan } = trip;

 
  useEffect(() => {
    const fetchDestinationImage = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(getTruncatedName(tripPlan.tripName))}&client_id=${UNSPLASH_ACCESS_KEY}&orientation=landscape&per_page=1`
        );
        const data = await response.json();
        setDestinationImage(
          data.results?.[0]?.urls?.regular ||
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e'
        );
      } catch (error) {
        console.error('Error fetching image:', error);
        setDestinationImage('https://images.unsplash.com/photo-1469474968028-56623f02e42e');
      } finally {
        setLoading(false);
      }
    };

    if (tripPlan.tripName) {
      fetchDestinationImage();
    }
  }, [tripPlan.tripName]);

  
  useEffect(() => {
    const fetchLocationImage = async (locationName) => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(locationName)}&client_id=${UNSPLASH_ACCESS_KEY}&orientation=landscape&per_page=1`
        );
        const data = await response.json();
        return (
          data.results?.[0]?.urls?.regular ||
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e'
        );
      } catch (error) {
        console.error('Error fetching image for location:', error);
        return 'https://images.unsplash.com/photo-1469474968028-56623f02e42e';
      }
    };

    const fetchAllImages = async () => {
      const images = {};
      for (const dayItem of tripPlan.days) {
        for (const location of dayItem.locations) {
          if (!images[location.name]) {
            images[location.name] = await fetchLocationImage(location.name);
          }
        }
      }
      setDayPlanImages(images);
    };

    if (tripPlan?.days) {
      fetchAllImages();
    }
  }, [tripPlan?.days]);

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
        <Text style={styles.priceText}>Price: {tripPlan.flightDetails.price}</Text>

        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => Linking.openURL(tripPlan.flightDetails.bookingUrl)}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
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
          <Text style={styles.priceText}>{hotel.rating}</Text>
        </View>
      ))}
    </View>
  );

  const renderDayPlan = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Day-wise Itinerary</Text>
      {tripPlan.days.map((dayItem, dayIndex) => (
        <View key={dayIndex} style={styles.card}>
          <Text style={styles.dayTitle}>Day {dayItem.day}</Text>
          {dayItem.locations.map((location, locIndex) => (
            <View key={locIndex} style={styles.activityContainer}>
              <Image
                source={{
                  uri: dayPlanImages[location.name] || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
                }}
                style={styles.locationImage}
              />
              <Text style={styles.activityText}>{location.name}</Text>
              <Text style={styles.activityTime}>{location.placeDetails}</Text>
              <Text style={styles.activityTime}>
                <Text style={styles.boldText}>Ticket Pricing: </Text>
                {location.ticketPricing}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );

  if (!trip || !tripPlan) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
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
        <View style={styles.imageContainer}>
          {loading ? (
            <View style={[styles.destinationImage, styles.centerContainer]}>
              <ActivityIndicator size="large" color="#000" />
            </View>
          ) : (
            <Image
              source={{ uri: destinationImage }}
              style={styles.destinationImage}
            />
          )}
        </View>
        
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
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
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
    fontFamily: "outfit"
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  priceText: {
    fontSize: 16,
    color: '#2E8B57',
    fontFamily: 'outfit-medium',
  },
  bookButton: {
    padding: 8,
    borderRadius: 16,
    backgroundColor: "#000",
    marginTop: 10,
  },
  bookButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "outfit",
    fontSize: 16,
  },
  hotelName: {
    fontSize: 18,
    fontFamily: 'outfit-medium',
    marginBottom: 5,
  },
  hotelAddress: {
    color: '#666',
    marginBottom: 5,
    fontFamily: "outfit"
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
    fontFamily: "outfit"
  },
  activityText: {
    fontSize: 16,
    fontFamily: "outfit"
  },
  boldText: {
    fontFamily: 'outfit-bold',
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
    fontFamily: "outfit"
  },
  locationImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 10,
    resizeMode: 'cover',
  },
});