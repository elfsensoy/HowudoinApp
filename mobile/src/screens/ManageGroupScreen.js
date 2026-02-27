import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ManageGroupsScreen = ({ navigation }) => {
  const [groupName, setGroupName] = useState('');
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [groups, setGroups] = useState([]);

  // Fetch user's friends
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

  // Fetch user's groups
  const fetchGroups = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      const response = await axios.get('http://localhost:8080/groups', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGroups(response.data || []);
    } catch (error) {
      console.error('Error fetching groups:', error);
      Alert.alert('Error', 'Unable to fetch groups.');
    }
  };

  // Create a new group
  const createGroup = async () => {
    if (!groupName.trim() || selectedFriends.length === 0) {
      Alert.alert('Error', 'Please provide a group name and select at least one friend.');
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
      fetchGroups(); // Refresh group list
    } catch (error) {
      console.error('Error creating group:', error);
      Alert.alert('Error', 'Unable to create group. Please try again.');
    }
  };

  // Select or deselect a friend for group creation
  const toggleFriendSelection = (friendEmail) => {
    if (selectedFriends.includes(friendEmail)) {
      setSelectedFriends(selectedFriends.filter((email) => email !== friendEmail));
    } else {
      setSelectedFriends([...selectedFriends, friendEmail]);
    }
  };

  // Fetch group details
  const fetchGroupDetails = async () => {
    try {
        console.log('Fetching group details for groupId:', groupId);
        const token = await AsyncStorage.getItem('jwt_token');
        console.log('Retrieved token:', token); // Debugging log

        if (!token) {
            throw new Error('No token found in AsyncStorage');
        }

        const response = await axios.get(`http://localhost:8080/groups/${groupId}`, {
            headers: { Authorization: `Bearer ${token}` }, // Ensure proper format
        });

        console.log('Group details fetched:', response.data);
        setGroupDetails(response.data);
    } catch (err) {
        console.error('Error fetching group details:', err);

        // Handle specific 403 error
        if (err.response && err.response.status === 403) {
            Alert.alert(
                'Access Denied',
                'You do not have permission to access this group. Please contact support.'
            );
        } else {
            setError('Failed to load group details.');
        }
    } finally {
        setLoading(false);
    }
};


  // Navigate to Group Chat or Details Screen
// Navigate to Group Details Screen
const openGroup = (group) => {
    navigation.navigate('GroupDetails', {
      groupId: group.groupId, // Corrected from group.id to group.groupId
      groupName: group.groupName,
    });
  };
  

  // Fetch friends and groups on load
  useEffect(() => {
    fetchFriends();
    fetchGroups();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Groups</Text>

      {/* Group Creation Section */}
      <TextInput
        style={styles.input}
        placeholder="Enter Group Name"
        value={groupName}
        onChangeText={setGroupName}
      />
      <Text style={styles.subtitle}>Select Friends to Add</Text>
      <FlatList
        data={friends}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.friendItem,
              selectedFriends.includes(item) ? styles.selectedFriend : {},
            ]}
            onPress={() => toggleFriendSelection(item)}
          >
            <Text style={styles.friendText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.createButton} onPress={createGroup}>
        <Text style={styles.createButtonText}>Create Group</Text>
      </TouchableOpacity>

      {/* Group List Section */}
      <Text style={styles.subtitle}>Your Groups</Text>
      {groups.length === 0 ? (
        <Text style={styles.noGroupsText}>No groups found.</Text>
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item.groupId}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.groupItem}
              onPress={() => openGroup(item)}
            >
              <Text style={styles.groupName}>{item.groupName}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  friendItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
  },
  selectedFriend: { backgroundColor: '#e0f7fa' },
  friendText: { fontSize: 16 },
  createButton: {
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  createButtonText: { color: '#fff', fontSize: 16 },
  noGroupsText: { fontSize: 16, color: '#777', textAlign: 'center', marginTop: 10 },
  groupItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
  },
  groupName: { fontSize: 16, fontWeight: 'bold' },
});

export default ManageGroupsScreen;
