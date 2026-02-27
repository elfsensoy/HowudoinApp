import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const FriendsListScreen = ({ navigation }) => {
  const [friends, setFriends] = useState([]);

  const fetchFriends = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      const response = await axios.get('http://localhost:8080/friends', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Friends fetched:', response.data);
      setFriends(response.data || []);
    } catch (error) {
      console.error('Error fetching friends:', error);
      Alert.alert('Error', 'Unable to fetch friends list.');
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const goToChat = (email) => {
    navigation.navigate('FriendChat', { friendEmail: email });
  };

  const renderItem = ({ item }) => {
    console.log('Rendering item:', item);
    return (
      <TouchableOpacity style={styles.friendContainer} onPress={() => goToChat(item)}>
        <Text style={styles.friendName}>{item?.toString() || 'Unnamed Friend'}</Text>
        <Text style={styles.friendStatus}>Friend</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Friends</Text>
      <FlatList
        data={friends}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No friends found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  friendContainer: {
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  friendName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  friendStatus: { fontSize: 14, color: '#888', marginTop: 5 },
});

export default FriendsListScreen;
