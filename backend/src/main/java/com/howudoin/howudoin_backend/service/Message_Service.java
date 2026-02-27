package com.howudoin.howudoin_backend.service;

import com.howudoin.howudoin_backend.model.Message;
import com.howudoin.howudoin_backend.model.User;
import com.howudoin.howudoin_backend.repository.Message_Repository;
import com.howudoin.howudoin_backend.repository.User_Repository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class Message_Service {

    private final User_Repository userRepository;
    private final Message_Repository messageRepository;

    public Message_Service(User_Repository userRepository, Message_Repository messageRepository) {
        this.userRepository = userRepository;
        this.messageRepository = messageRepository;
    }

    // Send a message
    public void sendMessage(String senderEmail, String receiverEmail, String content) {
        User sender = userRepository.findByEmail(senderEmail)
                .orElseThrow(() -> new RuntimeException("Sender not found: " + senderEmail));
        User receiver = userRepository.findByEmail(receiverEmail)
                .orElseThrow(() -> new RuntimeException("Receiver not found: " + receiverEmail));

        // Check if they are friends
        if (sender.getFriends() == null || !sender.getFriends().contains(receiverEmail)) {
            throw new RuntimeException("Users are not friends: Cannot send message.");
        }

        // Create and save the message
        Message message = new Message(senderEmail, receiverEmail, content);
        messageRepository.save(message);
    }

    // Get messages between two users
    public List<Message> getMessagesBetweenUsers(String user1Email, String user2Email) {
        User user1 = userRepository.findByEmail(user1Email)
                .orElseThrow(() -> new RuntimeException("User not found: " + user1Email));
        User user2 = userRepository.findByEmail(user2Email)
                .orElseThrow(() -> new RuntimeException("User not found: " + user2Email));

        // Check if they are friends
        if (user1.getFriends() == null || !user1.getFriends().contains(user2Email)) {
            throw new RuntimeException("Users are not friends: Cannot retrieve messages.");
        }

        // Fetch and return messages between the two users
        return messageRepository.findMessagesBetweenUsers(user1Email, user2Email);
    }
}
