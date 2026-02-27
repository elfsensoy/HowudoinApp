package com.howudoin.howudoin_backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String email;
    private String password;
    private List<String> friends = new ArrayList<>();
    private List<String> pendingFriendRequests = new ArrayList<>();

    // Default constructor
    public User() {}

    // Constructor
    public User(String email, String password) {
        this.email = email;
        this.password = password;
        this.friends = new ArrayList<>();
        this.pendingFriendRequests = new ArrayList<>();
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<String> getFriends() {
        return friends;
    }

    public void setFriends(List<String> friends) {
        this.friends = friends;
    }

    public List<String> getPendingFriendRequests() {
        return pendingFriendRequests;
    }

    public void setPendingFriendRequests(List<String> pendingFriendRequests) {
        this.pendingFriendRequests = pendingFriendRequests;
    }
}
