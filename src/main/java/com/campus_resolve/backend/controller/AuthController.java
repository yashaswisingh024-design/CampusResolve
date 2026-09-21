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
response.setName(loggedInUser.getName());
response.setEmail(loggedInUser.getEmail());
response.setRole(loggedInUser.getRole());
    return ResponseEntity.ok(response);
}
} 




