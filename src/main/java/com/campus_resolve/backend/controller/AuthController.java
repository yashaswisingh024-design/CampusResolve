package com.campus_resolve.backend.controller;
import com.campus_resolve.backend.service.UserService;
import java.sql.SQLException;
import org.springframework.web.bind.annotation.RestController;
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
public String register(@RequestBody User user) {

    userService.registerUser(user);

    return "Registration successful";
}
@PostMapping ("/api/auth/login")
public LoginRespone login(@RequestBody User user){
     User loggedInUser=userService.loginUser(user.getEmail(),user.getPassword());
     LoginRespone response = new LoginRespone();
     response.setName(loggedInUser.getName());
    response.setEmail(loggedInUser.getEmail());
    response.setRole(loggedInUser.getRole());
    return response;
} 




}