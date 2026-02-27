import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ManageGroupsScreen = ({ navigation }) => {
  const [groupName, setGroupName] = useState('');
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  // Fetch friends from the backend
  const fetchFriends = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      const response = await axios.get('http://localhost:8080/friends', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFriends(response.data || []);
    } catch (error) {
      console.error('Error fetching friends:', error);
      Alert.alert('Error', 'Unable to fetch friends.');
    }
  };

  // Create a new group
  const createGroup = async () => {
    if (!groupName.trim()) {
      Alert.alert('Error', 'Group name is required.');
      return;
    }

    if (selectedFriends.length === 0) {
      Alert.alert('Error', 'Please select at least one friend.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('jwt_token');
      await axios.post(
        'http://localhost:8080/groups/create',
        { groupName, members: selectedFriends },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert('Success', 'Group created successfully!');
      setGroupName('');
      setSelectedFriends([]);
    } catch (error) {
      console.error('Error creating group:', error);
      Alert.alert('Error', 'Unable to create group.');
    }
  };

  // Toggle friend selection
  const toggleFriendSelection = (email) => {
    if (selectedFriends.includes(email)) {
      setSelectedFriends(selectedFriends.filter((friend) => friend !== email));
    } else {
      setSelectedFriends([...selectedFriends, email]);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Group</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter group name"
        value={groupName}
        onChangeText={setGroupName}
      />

      <Text style={styles.subtitle}>Select Friends:</Text>
      <FlatList
        data={friends}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.friendContainer,
              selectedFriends.includes(item) && styles.selectedFriend,
            ]}
            onPress={() => toggleFriendSelection(item)}
          >
            <Text style={styles.friendName}>{item}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No friends found.</Text>}
      />

      <Button title="Create Group" onPress={createGroup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  friendContainer: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  selectedFriend: { backgroundColor: '#e0ffe0' },
  friendName: { fontSize: 16, color: '#333' },
});

export default ManageGroupsScreen;
