import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GroupListScreen = ({ navigation }) => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchGroups = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = await AsyncStorage.getItem('jwt_token');
            const response = await axios.get('http://localhost:8080/groups', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setGroups(response.data || []);
        } catch (err) {
            console.error('Error fetching groups:', err);
            setError('Failed to load groups. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const renderGroupItem = ({ item }) => (
        <TouchableOpacity
            style={styles.groupItem}
            onPress={() => navigation.navigate('GroupDetails', { groupId: item.id })}
        >
            <Text style={styles.groupName}>{item.name}</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return <Text style={styles.loading}>Loading groups...</Text>;
    }

    if (error) {
        return <Text style={styles.error}>{error}</Text>;
    }

    if (groups.length === 0) {
        return <Text style={styles.empty}>No groups found. Create a group to get started!</Text>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={groups}
                keyExtractor={(item) => item.id.toString()} // Ensure each group has a unique key
                renderItem={renderGroupItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    loading: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    empty: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
    groupItem: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    groupName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default GroupListScreen;
