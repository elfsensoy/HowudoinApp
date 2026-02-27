import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const MessagingScreen = ({ navigation }) => {
    const [friends, setFriends] = useState([]);

    // Fetch friends list
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

    useEffect(() => {
        fetchFriends();
    }, []);

    // Render each friend as a chat item
    const renderChatItem = ({ item }) => (
        <TouchableOpacity
            style={styles.chatContainer}
            onPress={() => navigation.navigate('FriendChat', { friendEmail: item })}
        >
            <Text style={styles.chatName}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={friends}
                keyExtractor={(item) => item}
                renderItem={renderChatItem}
                ListEmptyComponent={<Text>No friends found.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    chatContainer: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' },
    chatName: { fontSize: 18, fontWeight: 'bold' },
});

export default MessagingScreen;
