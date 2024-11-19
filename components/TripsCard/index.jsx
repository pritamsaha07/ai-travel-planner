import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { React, useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../FirebaseConfig';

const UNSPLASH_ACCESS_KEY = 'F0Q3Vk1weskGphZDwqp26moxfLbEqZTh7zTjMlmlD_Y';
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e';

const TripCard = ({ trip, onDelete }) => {
  const [destinationImage, setDestinationImage] = useState(null);
  const [loading, setLoading] = useState(true);
 
  const getTruncatedName = (name) => {
    if (!name) return '';
    return name.slice(0, 10);
  };

  useEffect(() => {
    const fetchDestinationImage = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(getTruncatedName(trip?.tripPlan?.tripName))}&client_id=${UNSPLASH_ACCESS_KEY}&orientation=landscape&per_page=1`
        );
        
        if (!response.ok) {
          console.warn(`Error response from Unsplash API: ${response.status}`);
          setDestinationImage(FALLBACK_IMAGE);
          return;
        }

        const text = await response.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          console.warn('Failed to parse response:', text);
          setDestinationImage(FALLBACK_IMAGE);
          return;
        }
        
        if (data.results && data.results.length > 0) {
          setDestinationImage(data.results[0].urls.regular);
        } else {
          setDestinationImage(FALLBACK_IMAGE);
        }
      } catch (error) {
        console.warn('Error fetching image:', error);
        setDestinationImage(FALLBACK_IMAGE);
      } finally {
        setLoading(false);
      }
    };

    if (trip?.tripPlan?.tripName) {
      fetchDestinationImage();
    }
  }, [trip?.tripPlan?.tripName]);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // const handleDelete = async () => {
  //   Alert.alert(
  //     "Delete Trip",
  //     "Are you sure you want to delete this trip?",
  //     [
  //       {
  //         text: "Cancel",
  //         style: "cancel"
  //       },
  //       {
  //         text: "Delete",
  //         style: "destructive",
  //         onPress: async () => {
  //           try {
  //             await deleteDoc(doc(db, "trips", trip.userId));
  //             if (onDelete) {
  //               onDelete(trip.userId);
  //             }
  //           } catch (error) {
  //             console.error("Error deleting trip:", error);
  //             Alert.alert("Error", "Failed to delete trip. Please try again.");
  //           }
  //         }
  //       }
  //     ]
  //   );
  // };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {loading ? (
          <View style={[styles.image, styles.loadingContainer]}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
          <Image 
            source={{ uri: destinationImage || FALLBACK_IMAGE }}
            style={styles.image}
            onError={() => setDestinationImage(FALLBACK_IMAGE)}
          />
        )}
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.tripName}>{trip?.tripPlan?.tripName}</Text>
          <TouchableOpacity 
            // onPress={handleDelete}
            style={styles.deleteButton}
          >
            <Ionicons name="trash-outline" size={24} color="#FF4444" />
          </TouchableOpacity>
        </View>
        
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
            {trip?.tripPlan?.days?.length || 0} Days Trip
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
    marginHorizontal: 1
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden', 
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  loadingContainer: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 15,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    padding: 5,
  },
  tripName: {
    fontSize: 18,
    fontFamily: 'outfit-bold',
    color: '#000',
    flex: 1,
    marginRight: 10,
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