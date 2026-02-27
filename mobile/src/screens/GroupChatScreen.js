import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const GroupChatScreen = ({ route }) => {
    const { groupId, groupName } = route.params || {};
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');

    // Fetch messages for the group
    const fetchMessages = async () => {
        try {
            const token = await AsyncStorage.getItem('jwt_token');
            const response = await axios.get(
                `http://localhost:8080/groups/${groupId}/messages`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setMessages(response.data || []);
        } catch (error) {
            console.error('Error fetching group messages:', error);
        }
    };

    // Send a new message to the group
    const sendMessage = async () => {
        if (!messageText.trim()) return; // Prevent sending empty messages
        try {
            const token = await AsyncStorage.getItem('jwt_token');
            await axios.post(
                `http://localhost:8080/groups/${groupId}/send`,
                {
                    content: messageText,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setMessageText('');
            fetchMessages(); // Refresh messages after sending
        } catch (error) {
            console.error('Error sending group message:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [groupId]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{groupName}</Text>
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.messageContainer,
                            item.senderEmail === groupId ? styles.receivedMessage : styles.sentMessage,
                        ]}
                    >
                        <Text style={styles.sender}>{item.senderEmail}</Text>
                        <Text>{item.content}</Text>
                    </View>
                )}
            />
            <TextInput
                style={styles.input}
                placeholder="Type your message..."
                value={messageText}
                onChangeText={setMessageText}
            />
            <Button title="Send" onPress={sendMessage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    messageContainer: { marginVertical: 5, padding: 10, borderRadius: 5 },
    sentMessage: { alignSelf: 'flex-end', backgroundColor: '#e0ffe0' },
    receivedMessage: { alignSelf: 'flex-start', backgroundColor: '#f0f0f0' },
    sender: { fontWeight: 'bold', marginBottom: 5 },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});

export default GroupChatScreen;
