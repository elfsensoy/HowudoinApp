package com.howudoin.howudoin_backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.howudoin.howudoin_backend.model.Group_Message;

import java.util.List;

@Repository
public interface Group_Message_Repository extends MongoRepository<Group_Message, String> {

    // Query to retrieve all messages for a specific group
    List<Group_Message> findByGroupId(String groupId);
}

