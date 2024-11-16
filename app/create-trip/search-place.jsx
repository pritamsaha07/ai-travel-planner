import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { CreateTripContext } from '../../context/CreateTripContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import selectTraveler from '../create-trip/select-traveler';
export default function SearchPlace() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Search',
    });
  }, []);

  const handleSearch = (value) => {
    setSearchValue(value);
    setTripData( ({
    
      locationInfo: {
        name: value
      }
    }));
  };

  const handleSubmit = () => {
    if (searchValue.trim()) {
      router.push("/create-trip/select-traveler");
    }
  };

  const clearSearch = () => {
    setSearchValue('');
    setTripData(prevData => ({
      ...prevData,
      locationInfo: {
        name: ''
      }
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search location..."
          placeholderTextColor="#666"
          value={searchValue}
          onChangeText={handleSearch}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
        />
        {searchValue.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Ionicons name="close-outline" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 75,
    backgroundColor: '#fff',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
});