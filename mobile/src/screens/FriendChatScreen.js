import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const FriendChatScreen = ({ route }) => {
    const { friendEmail } = route.params || {};
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');

    // Fetch messages with the friend
    const fetchMessages = async () => {
        try {
            const token = await AsyncStorage.getItem('jwt_token');
            const response = await axios.get(
                `http://localhost:8080/messages?otherUserEmail=${friendEmail}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setMessages(response.data || []);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    // Send a new message
    const sendMessage = async () => {
        try {
            const token = await AsyncStorage.getItem('jwt_token');
            await axios.post(
                'http://localhost:8080/messages/send',
                {
                    receiverEmail: friendEmail,
                    content: messageText,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setMessageText('');
            fetchMessages(); // Refresh messages after sending
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [friendEmail]);

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.messageContainer,
                            item.senderEmail === friendEmail ? styles.receivedMessage : styles.sentMessage,
                        ]}
                    >
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
    messageContainer: { marginVertical: 5, padding: 10, borderRadius: 5 },
    sentMessage: { alignSelf: 'flex-end', backgroundColor: '#e0ffe0' },
    receivedMessage: { alignSelf: 'flex-start', backgroundColor: '#f0f0f0' },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});

export default FriendChatScreen;
