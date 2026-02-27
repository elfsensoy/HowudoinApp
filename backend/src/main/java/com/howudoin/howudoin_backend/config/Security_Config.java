package com.howudoin.howudoin_backend.config;

import com.howudoin.howudoin_backend.security.JwtAuthenticationFilter;
import com.howudoin.howudoin_backend.security.JWTUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class Security_Config {

    private final JWTUtil jwtUtil;

    public Security_Config(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Create an instance of JwtAuthenticationFilter
        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(jwtUtil);

        http.csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers("/api/register", "/api/login").permitAll() // Publicly accessible
                .requestMatchers("/api/secureEndpoint", "/messages/**", "/groups/**").authenticated() // Require authentication
                .anyRequest().authenticated() // Protect all other endpoints
                .and()
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // Add JWT filter before UsernamePasswordAuthenticationFilter

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
