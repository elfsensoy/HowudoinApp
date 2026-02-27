package com.howudoin.howudoin_backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "groups")
public class Group {
    @Id
    private String id;
    private String groupName;
    private LocalDateTime creationTime;
    private List<String> members;

    public Group(String id, String groupName, List<String> members) {
        this.id = id;
        this.groupName = groupName;
        this.members = members;
        this.creationTime = LocalDateTime.now();
    }

    public String getId() {
        return id;
    }

    public String getGroupName() {
        return groupName;
    }

    public LocalDateTime getCreationTime() {
        return creationTime;
    }

    public List<String> getMembers() {
        return members;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public void setMembers(List<String> members) {
        this.members = members;
    }
}
