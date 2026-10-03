package com.campus_resolve.backend.controller;
import com.campus_resolve.backend.service.UserService;
import java.sql.SQLException;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.campus_resolve.backend.model.LoginRespone;
import com.campus_resolve.backend.model.User;
@RestController
public class AuthController {
    private UserService userService;
    public AuthController() throws SQLException {
    userService = new UserService();
}
@PostMapping("/api/auth/register")
public ResponseEntity<String> register(@RequestBody User user) {
    if(user.getName() == null || user.getName().isBlank()|| user.getEmail() == null || user.getEmail().isBlank()|| user.getPassword() == null || user.getPassword().isBlank()) {
    return ResponseEntity.badRequest().body("All fields are required");
}
    boolean result= userService.registerUser(user);
    if(result){
    return ResponseEntity.ok("Registration successful");    
}
     return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already registered");
}
@PostMapping("/api/auth/login")
public ResponseEntity<LoginRespone> login(@RequestBody User user) {
User loggedInUser = userService.loginUser(user.getEmail(),user.getPassword());
if (loggedInUser == null) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
LoginRespone response = new LoginRespone();
response.setUserId(loggedInUser.getUserId());
response.setName(loggedInUser.getName());
response.setEmail(loggedInUser.getEmail());
response.setRole(loggedInUser.getRole());
    return ResponseEntity.ok(response);
}

@PostMapping("/api/auth/google")
public ResponseEntity<?> googleLogin(@RequestBody java.util.Map<String, String> payload) {
    String idToken = payload.get("credential");
    if (idToken == null || idToken.isBlank()) {
        return ResponseEntity.badRequest().body("Token missing");
    }

    org.springframework.web.client.RestTemplate restTemplate = new org.springframework.web.client.RestTemplate();
    String googleUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken;
    try {
        java.util.Map<String, Object> googleResponse = restTemplate.getForObject(googleUrl, java.util.Map.class);
        if (googleResponse == null || googleResponse.containsKey("error")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Google Token");
        }
        
        String email = (String) googleResponse.get("email");
        String name = (String) googleResponse.get("name");
        
        if (email == null || !email.endsWith("@apsit.edu.in")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Please use your APSIT college Google account (@apsit.edu.in) to continue.");
        }
        
        User user = userService.getUserByEmail(email);
        if (user == null) {
            user = new User();
            user.setName(name);
            user.setEmail(email);
            user.setPassword(""); // No password for Google users
            userService.registerUser(user);
            user = userService.getUserByEmail(email);
        }
        
        LoginRespone response = new LoginRespone();
        response.setUserId(user.getUserId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        return ResponseEntity.ok(response);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Failed to verify Google Token");
    }
}
}




