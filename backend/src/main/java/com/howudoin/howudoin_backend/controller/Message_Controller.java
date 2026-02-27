package com.howudoin.howudoin_backend.controller;

import com.howudoin.howudoin_backend.model.Message;
import com.howudoin.howudoin_backend.service.Message_Service;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/messages")
public class Message_Controller {

    private final Message_Service messageService;

    public Message_Controller(Message_Service messageService) {
        this.messageService = messageService;
    }

    // Send a message
    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@RequestBody Map<String, String> request) {
        // Extract the sender's email from the JWT token
        String senderEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        // Extract the receiver's email and message content from the request body
        String receiverEmail = request.get("receiverEmail");
        String content = request.get("content");

        if (receiverEmail == null || receiverEmail.isEmpty() || content == null || content.isEmpty()) {
            return ResponseEntity.badRequest().body("Receiver email and content are required.");
        }

        // Call the service to send the message
        messageService.sendMessage(senderEmail, receiverEmail, content);
        return ResponseEntity.ok("Message sent successfully!");
    }

    // Get messages between two users
    @GetMapping
    public ResponseEntity<List<Message>> getMessages(@RequestParam String otherUserEmail) {
        // Extract the authenticated user's email from the JWT token
        String authenticatedUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        if (otherUserEmail == null || otherUserEmail.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        // Call the service to get messages between the authenticated user and the other user
        List<Message> messages = messageService.getMessagesBetweenUsers(authenticatedUserEmail, otherUserEmail);
        return ResponseEntity.ok(messages);
    }
}
