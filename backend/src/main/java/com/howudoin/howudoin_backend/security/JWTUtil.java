package com.howudoin.howudoin_backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JWTUtil {

    // Secret key for signing the token
    private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Token validity (e.g., 1 hour in milliseconds)
    private static final long TOKEN_VALIDITY = 1000 * 60 * 60;

    // Generate a token for a given email
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY))
                .signWith(secretKey)
                .compact();
    }

    // Validate token (checks signature and expiration)
    public boolean validateToken(String token) {
        try {
            Claims claims = getClaims(token);
            return !isTokenExpired(claims); // Token is valid if not expired
        } catch (Exception e) {
            // Log exception for debugging
            e.printStackTrace();
            return false; // Token is invalid
        }
    }

    public boolean validateTokenWithEmail(String token, String email) {
        try {
            if (email == null || email.isEmpty()) {
                throw new RuntimeException("Provided email is null or empty");
            }

            Claims claims = getClaims(token);
            String extractedEmail = claims.getSubject().trim();
            String providedEmail = email.trim();

            // Check if the emails match and the token is not expired
            boolean isEmailMatching = extractedEmail.equals(providedEmail);
            boolean isTokenNotExpired = !claims.getExpiration().before(new Date());

            return isEmailMatching && isTokenNotExpired;
        } catch (Exception e) {
            e.printStackTrace();
            return false; // Token is invalid or expired
        }
    }



    // Extract email from the token
    public String extractEmail(String token) {
        try {
            return getClaims(token).getSubject();
        } catch (Exception e) {
            e.printStackTrace();
            return null; // Return null if token is invalid
        }
    }

    // Check if the token is expired
    private boolean isTokenExpired(Claims claims) {
        return claims.getExpiration().before(new Date());
    }

    // Retrieve claims from the token
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
