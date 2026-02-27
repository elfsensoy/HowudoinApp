package com.howudoin.howudoin_backend.controller;

import com.howudoin.howudoin_backend.model.Group;
import com.howudoin.howudoin_backend.model.Group_Message;
import com.howudoin.howudoin_backend.service.Group_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/groups")
public class Group_Controller {

    @Autowired
    private Group_Service groupService;

    // Create a new group
    @PostMapping("/create")
    public ResponseEntity<Group> createGroup(@RequestBody Map<String, Object> request) {
        // Extract group name and members from the request
        String groupName = (String) request.get("groupName");
        List<String> members = (List<String>) request.get("members");

        // Validate the inputs
        if (groupName == null || groupName.isEmpty() || members == null || members.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        // Add the authenticated user (group creator) to the members list
        String creatorEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!members.contains(creatorEmail)) {
            members.add(creatorEmail);
        }

        Group group = groupService.createGroup(groupName, members);
        return ResponseEntity.ok(group);
    }

    // Add a member to a group
    @PostMapping("/{groupId}/add-member")
    public ResponseEntity<Group> addMemberToGroup(
            @PathVariable String groupId,
            @RequestBody Map<String, String> request) {
        String newMemberEmail = request.get("newMemberEmail");

        if (newMemberEmail == null || newMemberEmail.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        Group group = groupService.addMemberToGroup(groupId, newMemberEmail);
        return ResponseEntity.ok(group);
    }

    // Send a message to a group
    @PostMapping("/{groupId}/send")
    public ResponseEntity<Group_Message> sendMessageToGroup(
            @PathVariable String groupId,
            @RequestBody Map<String, String> request) {
        // Extract the sender's email from the JWT token
        String senderEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        // Extract the message content from the request
        String content = request.get("content");

        if (content == null || content.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        Group_Message message = groupService.sendMessageToGroup(groupId, senderEmail, content);
        return ResponseEntity.ok(message);
    }

    // Retrieve group members
    @GetMapping("/{groupId}/members")
    public ResponseEntity<List<String>> getGroupMembers(@PathVariable String groupId) {
        List<String> members = groupService.getGroupMembers(groupId);
        return ResponseEntity.ok(members);
    }

    // Retrieve group messages
    @GetMapping("/{groupId}/messages")
    public ResponseEntity<List<Group_Message>> getGroupMessages(@PathVariable String groupId) {
        List<Group_Message> messages = groupService.getGroupMessages(groupId);
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<Group> getGroupDetails(@PathVariable String groupId) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(groupService.getGroupDetails(groupId, userEmail));
    }
}
