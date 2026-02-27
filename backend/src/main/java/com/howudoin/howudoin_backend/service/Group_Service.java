package com.howudoin.howudoin_backend.service;

import com.howudoin.howudoin_backend.model.Group;
import com.howudoin.howudoin_backend.model.Group_Message;
import com.howudoin.howudoin_backend.repository.Group_Repository;
import com.howudoin.howudoin_backend.repository.Group_Message_Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Group_Service {

    private final Group_Repository groupRepository;
    private final Group_Message_Repository groupMessageRepository;

    public Group_Service(Group_Repository groupRepository, Group_Message_Repository groupMessageRepository) {
        this.groupRepository = groupRepository;
        this.groupMessageRepository = groupMessageRepository;
    }

    // Create a new group
    public Group createGroup(String groupName, List<String> members) {
        String groupId = java.util.UUID.randomUUID().toString(); // Generate a unique group ID
        Group group = new Group(groupId, groupName, members);

        return groupRepository.save(group);
    }

    // Add a member to an existing group
    public Group addMemberToGroup(String groupId, String newMemberEmail) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found: " + groupId));

        if (group.getMembers().contains(newMemberEmail)) {
            throw new RuntimeException("User is already a member of the group.");
        }

        group.getMembers().add(newMemberEmail);
        return groupRepository.save(group);
    }

    // Send a message to a group
    public Group_Message sendMessageToGroup(String groupId, String senderEmail, String content) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found: " + groupId));

        if (!group.getMembers().contains(senderEmail)) {
            throw new RuntimeException("User is not a member of this group.");
        }

        Group_Message message = new Group_Message(groupId, senderEmail, content);
        return groupMessageRepository.save(message);
    }

    // Retrieve group members
    public List<String> getGroupMembers(String groupId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found: " + groupId));

        return group.getMembers();
    }

    // Retrieve group messages
    public List<Group_Message> getGroupMessages(String groupId) {
        groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found: " + groupId));

        return groupMessageRepository.findByGroupId(groupId);
    }

    public Group getGroupDetails(String groupId, String userEmail) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));
        if (!group.getMembers().contains(userEmail)) {
            throw new AccessDeniedException("User is not a member of this group");
        }
        return group;

    }
