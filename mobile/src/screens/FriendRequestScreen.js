import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const FriendRequestScreen = () => {
  const [receiverEmail, setReceiverEmail] = useState('');

  const handleSendRequest = async () => {
    if (!receiverEmail) {
      Alert.alert('Error', 'Please enter an email address.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('jwt_token');
      const senderEmail = await AsyncStorage.getItem('user_email'); // Assuming you save the logged-in user's email
      const response = await axios.post(
        'http://localhost:8080/friends/add',
        { senderId: senderEmail, receiverId: receiverEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert('Success', 'Friend request sent successfully.');
    } catch (error) {
      Alert.alert('Error', 'Failed to send friend request. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Friend Request</Text>
      <TextInput
        placeholder="Enter email address"
        style={styles.input}
        value={receiverEmail}
        onChangeText={setReceiverEmail}
      />
      <Button title="Send Request" onPress={handleSendRequest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default FriendRequestScreen;
