import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { Entypo } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'blue', // Set the active tab color
        tabBarInactiveTintColor: 'gray', // Set the inactive tab color
      }}
    >
      <Tabs.Screen
        name="myTrip"
        options={{
          tabBarLabel:'My Trip',
          tabBarIcon: ({ color, focused }) => (
            <Entypo name="location" size={24} color={focused ? 'blue' : 'gray'} />
          ),
        }}
      />
      {/* <Tabs.Screen name="discover" />
      <Tabs.Screen name="profile" /> */}
    </Tabs>
  );
}