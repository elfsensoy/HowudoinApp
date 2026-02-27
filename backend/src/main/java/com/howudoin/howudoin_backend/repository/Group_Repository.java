package com.howudoin.howudoin_backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.howudoin.howudoin_backend.model.Group;

import java.util.List;

@Repository
public interface Group_Repository extends MongoRepository<Group, String> {
    List<Group> findByMembersContaining(String memberEmail);
}
