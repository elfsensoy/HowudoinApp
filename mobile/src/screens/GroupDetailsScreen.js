import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const GroupDetailsScreen = ({ route }) => {
    const { groupId } = route.params || {};
    const [groupDetails, setGroupDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                const token = await AsyncStorage.getItem('jwt_token');
                const response = await axios.get(`http://localhost:8080/groups/${groupId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setGroupDetails(response.data);
            } catch (err) {
                console.error('Error fetching group details:', err);
                setError('Failed to load group details.');
            } finally {
                setLoading(false);
            }
        };

        fetchGroupDetails();
    }, [groupId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading group details...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    // Convert creationTime to a human-readable format
    const formattedCreationTime = groupDetails.creationTime
        ? new Date(groupDetails.creationTime).toLocaleString()
        : 'Unknown';

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{groupDetails.groupName}</Text>
            <Text style={styles.subtitle}>Created At: {formattedCreationTime}</Text>
            <Text style={styles.subtitle}>Members:</Text>
            <FlatList
                data={groupDetails.members}
                keyExtractor={(item) => item}
                renderItem={({ item }) => <Text style={styles.memberText}>{item}</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    subtitle: { fontSize: 18, marginBottom: 10 },
    memberText: { fontSize: 16, marginVertical: 5 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { fontSize: 18 },
    errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    errorText: { fontSize: 18, color: 'red' },
});

export default GroupDetailsScreen;
