package com.howudoin.howudoin_backend.controller;

import com.howudoin.howudoin_backend.service.Friend_Request_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/friends")
public class Friend_Request_Controller {

    @Autowired
    private Friend_Request_Service friendRequestService;

    // Send a friend request
    @PostMapping("/add")
    public ResponseEntity<String> sendFriendRequest(@RequestBody Map<String, String> request) {
        // Extract authenticated user's email from the SecurityContext
        String senderEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        // Extract receiver's email from the request body
        String receiverEmail = request.get("receiverId");

        if (receiverEmail == null || receiverEmail.isEmpty()) {
            return ResponseEntity.badRequest().body("Receiver email is required");
        }

        // Call the service to send the friend request
        friendRequestService.sendFriendRequest(senderEmail, receiverEmail);
        return ResponseEntity.ok("Friend request sent successfully!");
    }

    // Accept a friend request
    @PostMapping("/accept")
    public ResponseEntity<String> acceptFriendRequest(@RequestBody Map<String, String> request) {
        // Extract authenticated user's email from the SecurityContext
        String receiverEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        // Extract sender's email from the request body
        String senderEmail = request.get("senderId");

        if (senderEmail == null || senderEmail.isEmpty()) {
            return ResponseEntity.badRequest().body("Sender email is required");
        }

        // Call the service to accept the friend request
        friendRequestService.acceptFriendRequest(senderEmail, receiverEmail);
        return ResponseEntity.ok("Friend request accepted successfully!");
    }

    // Get the friends list of the authenticated user
    @GetMapping
    public ResponseEntity<List<String>> getFriends() {
        // Extract authenticated user's email from the SecurityContext
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        // Call the service to get the user's friends
        List<String> friends = friendRequestService.getFriends(userEmail);
        return ResponseEntity.ok(friends);
    }
}
