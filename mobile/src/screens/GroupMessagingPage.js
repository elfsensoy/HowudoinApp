import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const GroupMessagingPage = ({ navigation }) => {
    const [groups, setGroups] = useState([]);

    // Fetch all groups from the backend
    const fetchGroups = async () => {
        try {
            const token = await AsyncStorage.getItem('jwt_token');
            const response = await axios.get('http://localhost:8080/groups', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setGroups(response.data || []);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Group Messaging</Text>
            <FlatList
                data={groups}
                keyExtractor={(item) => item.groupId}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.groupItem}
                        onPress={() =>
                            navigation.navigate('GroupChat', {
                                groupId: item.groupId,
                                groupName: item.groupName,
                            })
                        }
                    >
                        <Text style={styles.groupName}>{item.groupName}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    groupItem: { padding: 15, marginVertical: 5, backgroundColor: '#f0f0f0', borderRadius: 5 },
    groupName: { fontSize: 18, fontWeight: 'bold' },
});

export default GroupMessagingPage;
