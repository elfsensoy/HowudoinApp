package com.howudoin.howudoin_backend.repository;

import com.howudoin.howudoin_backend.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Message_Repository extends MongoRepository<Message, String> {

    // Find messages between two users (both directions)
    @Query("{ $or: [ { $and: [ { senderEmail: ?0 }, { receiverEmail: ?1 } ] }, { $and: [ { senderEmail: ?1 }, { receiverEmail: ?0 } ] } ] }")
    List<Message> findMessagesBetweenUsers(String user1Email, String user2Email);
}
