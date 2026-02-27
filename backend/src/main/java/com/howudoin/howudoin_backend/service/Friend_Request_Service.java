package com.howudoin.howudoin_backend.service;

import com.howudoin.howudoin_backend.model.User;
import com.howudoin.howudoin_backend.repository.User_Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class Friend_Request_Service {

    @Autowired
    private User_Repository userRepository;

    // Send a friend request
    public void sendFriendRequest(String senderEmail, String receiverEmail) {
        User sender = userRepository.findByEmail(senderEmail)
                .orElseThrow(() -> new RuntimeException("Sender not found: " + senderEmail));
        User receiver = userRepository.findByEmail(receiverEmail)
                .orElseThrow(() -> new RuntimeException("Receiver not found: " + receiverEmail));

        // Check if already friends
        if (sender.getFriends() != null && sender.getFriends().contains(receiverEmail)) {
            throw new RuntimeException("Users are already friends!");
        }

        // Check if friend request already exists
        if (receiver.getPendingFriendRequests() != null && receiver.getPendingFriendRequests().contains(senderEmail)) {
            throw new RuntimeException("Friend request already sent!");
        }

        // Add friend request
        if (receiver.getPendingFriendRequests() == null) {
            receiver.setPendingFriendRequests(new ArrayList<>());
        }
        receiver.getPendingFriendRequests().add(senderEmail);
        userRepository.save(receiver);
    }

    // Accept a friend request
    public void acceptFriendRequest(String senderEmail, String receiverEmail) {
        User sender = userRepository.findByEmail(senderEmail)
                .orElseThrow(() -> new RuntimeException("Sender not found: " + senderEmail));
        User receiver = userRepository.findByEmail(receiverEmail)
                .orElseThrow(() -> new RuntimeException("Receiver not found: " + receiverEmail));

        // Check if the friend request exists
        if (receiver.getPendingFriendRequests() == null || !receiver.getPendingFriendRequests().contains(senderEmail)) {
            throw new RuntimeException("No friend request from " + senderEmail + " to " + receiverEmail);
        }

        // Remove the friend request
        receiver.getPendingFriendRequests().remove(senderEmail);

        // Initialize friends lists if null
        if (receiver.getFriends() == null) {
            receiver.setFriends(new ArrayList<>());
        }
        if (sender.getFriends() == null) {
            sender.setFriends(new ArrayList<>());
        }

        // Add each other as friends
        receiver.getFriends().add(senderEmail);
        sender.getFriends().add(receiverEmail);

        // Save the updated users
        userRepository.save(receiver);
        userRepository.save(sender);
    }

    // Get the friends list of a user
    public List<String> getFriends(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found: " + userEmail));

        return user.getFriends() != null ? user.getFriends() : new ArrayList<>();
    }
}
