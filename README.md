# HowudoinApp
*A Full-Stack Mobile Messaging Application*

## 📌 Project Overview

**HowudoinApp** is a full-stack mobile messaging application inspired by modern communication platforms such as WhatsApp. The goal of this project was to understand and implement the backend architecture behind messaging systems, including authentication, user relationships, direct messaging, and group communication.

The project consists of two main parts:

- 📱 **Mobile Client** – built using React Native (TypeScript)  
- 🧠 **Backend API** – built using Java Spring Boot  

The mobile application communicates with the backend through a **RESTful API**, allowing users to authenticate, manage friendships, and exchange messages.

The purpose of this project was not only to build a working messaging interface but also to understand how a backend system manages user authentication, communication logic, and access control.

## 🏗️ System Architecture

The backend follows a layered architecture:

- **Controller Layer** → Handles incoming HTTP requests and API endpoints  
- **Service Layer** → Contains the main business logic of the system  
- **Repository Layer** → Manages data access and persistence  
- **Mobile Client Layer** → Handles user interface, navigation, and API calls  

This separation of responsibilities makes the system easier to maintain, easier to understand, and closer to real-world backend architecture used in production systems.

## 🔐 Authentication & Token System

The application uses **token-based authentication** to protect API endpoints.

### Login Process

1. A user enters their credentials in the mobile application.
2. The mobile client sends a request to: POST/api/login
3. Backend validates the credentials.
4. If authentication is successful, the backend generates a **new authentication token**.
5. The token is returned to the mobile application.

The mobile client then automatically includes this token in future API requests.

The user does **not manually interact with the token**.  
Token handling is managed internally by the application.

### Protected Endpoints

Most actions in the system require a valid token, including:

- Sending friend requests  
- Accepting friend requests  
- Sending messages  
- Creating groups  
- Adding members to groups  
- Sending group messages  

Each protected request includes an authorization header: Authorization: Bearer <token>

Before executing the requested operation, the backend:

1. Extracts the token from the request header  
2. Validates the token  
3. Identifies the authenticated user  
4. Executes the request only if the token is valid  

If the token is missing or invalid, the request is rejected.

This ensures that only authenticated users can interact with the messaging system.


## 👥 Friend Management System

The application supports a simple friend request workflow.

### Features

- Send friend requests  
- Accept friend requests  
- Retrieve friend list  

Example endpoint: POST/friends/accept

The backend manages relationship states between users and ensures that only valid transitions occur (for example, pending → accepted).

## 💬 Direct Messaging

Users can send direct messages to other users.

Messages are sent through: POST/messages/send


### Messaging Flow

1. The client sends the message content and receiver information.
2. The backend validates the authentication token.
3. The backend verifies that both users exist.
4. A message record is created and stored.
5. The response is returned to the client.
6. The mobile application updates the user interface.

Each message contains:

- Sender ID  
- Receiver ID  
- Timestamp  
- Message content  

## 👨‍👩‍👧 Group Messaging

The application also supports group conversations.

### Supported Endpoints
POST /groups/create
POST /groups/{groupId}/add-member
POST /groups/{groupId}/send

### Group Workflow

- A user creates a group.
- Members can be added to the group.
- Only authenticated group members can send messages.
- The backend validates group membership before accepting a message.

This required implementing additional access control logic for group-based messaging.


## 📱 Mobile Application

The mobile client was built using:

- React Native  
- TypeScript  
- Metro bundler  

The mobile application is responsible for:

- Rendering the user interface  
- Handling navigation between screens  
- Sending API requests to the backend  
- Managing authentication state  
- Displaying messages, friends, and groups  


## 🛠️ Backend Implementation

The backend was implemented using:

- Java  
- Spring Boot  
- Gradle  

The backend handles:

- Authentication and token validation  
- Friend relationship management  
- Message processing  
- Group management  
- Authorization checks for protected endpoints  

## 🎯 Engineering Focus

This project focuses on understanding the backend architecture behind messaging applications, including:

- Client-server communication  
- REST API design  
- Token-based authentication  
- Relationship modeling between users  
- Access control for messaging systems  
- Separation of concerns in backend architecture  


## 📚 What I Learned

Through this project I gained experience in:

- Designing backend APIs for mobile applications  
- Implementing token-based authentication  
- Structuring a layered Spring Boot backend  
- Managing client-server communication  
- Modeling messaging workflows between users  
- Testing API endpoints using Postman  


## 🎥 Demonstration

A short demonstration of the application and backend API can be found here:

- backend: https://drive.google.com/file/d/1Db0BiQ5rzBKYH0KMT1SP12gxUIGQRyN0/view?usp=sharing
- frontend: https://drive.google.com/file/d/1dm5Lu9TrMLwmZDXamG0ShmHFNp8g4yQO/view?usp=sharing 

## 👩‍💻 Author

Elif Şensoy  
Computer Science Student – Sabancı University


