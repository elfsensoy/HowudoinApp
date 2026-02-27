package com.howudoin.howudoin_backend.controller;

import com.howudoin.howudoin_backend.model.User;
import com.howudoin.howudoin_backend.security.JWTUtil;
import com.howudoin.howudoin_backend.service.User_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class User_Controller {

    @Autowired
    private User_Service userService;

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User loginRequest) {
        return userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
    }
    @GetMapping("/secureEndpoint")
    public String secureEndpoint(@RequestHeader("Authorization") String token, @RequestParam String email) {

        // Strip "Bearer " prefix
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // Remove "Bearer " prefix

            if (jwtUtil.validateTokenWithEmail(token, email)) {
                return "Secure data accessed!";
            }
        }
        return "Invalid token";
    }


}
