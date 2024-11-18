import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const TripCard = ({ trip }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: trip?.tripPlan?.destinationImageUrl }} 
        style={styles.image}
      />
      
      <View style={styles.contentContainer}>
        <Text style={styles.tripName}>{trip?.tripPlan?.tripName}</Text>
        
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="calendar-outline" size={20} color="#666" />
            <Text style={styles.infoText}>
              Created: {formatDate(trip?.createdAt)}
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <Ionicons name="wallet-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{trip?.tripPlan?.budget}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <Text style={styles.infoText}>
              Best Time: {trip?.tripPlan?.bestTimetoVisit}
            </Text>
          </View>
        </View>

        <View style={styles.daysContainer}>
          <Text style={styles.daysText}>
            {trip?.tripPlan?.days.length} Days Trip
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal:1
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  contentContainer: {
    padding: 15,
  },
  tripName: {
    fontSize: 18,
    fontFamily: 'outfit-bold',
    color: '#000',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  infoText: {
    color: '#666',
    fontSize: 14,
    fontFamily: 'outfit-medium',
  },
  daysContainer: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  daysText: {
    color: '#000',
    fontSize: 12,
    fontFamily: 'outfit-medium',
  },
});

export default TripCard;