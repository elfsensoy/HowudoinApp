import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const PendingRequestsScreen = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt_token');
        const response = await axios.get('http://localhost:8080/friends/pending', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPendingRequests(response.data); // Assuming the data is an array of sender emails
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pending requests:', error);
        Alert.alert('Error', 'Failed to fetch pending friend requests.');
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, []);

  const acceptRequest = async (senderEmail) => {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      await axios.post(
        'http://localhost:8080/friends/accept',
        { senderId: senderEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert('Success', `Friend request from ${senderEmail} accepted!`);
      setPendingRequests((prev) => prev.filter((email) => email !== senderEmail)); // Remove accepted request
    } catch (error) {
      console.error('Error accepting friend request:', error);
      Alert.alert('Error', 'Failed to accept friend request.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item}</Text>
      <TouchableOpacity style={styles.acceptButton} onPress={() => acceptRequest(item)}>
        <Text style={styles.buttonText}>Accept</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pending Friend Requests</Text>
      <FlatList
        data={pendingRequests}
        keyExtractor={(item, index) => index.toString()} // Use index if no unique ID is available
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No pending requests.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PendingRequestsScreen;
