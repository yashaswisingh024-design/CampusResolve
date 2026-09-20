package com.campus_resolve.backend.service;
import java.sql.SQLException;
import com.campus_resolve.backend.dao.UserDAO;
import com.campus_resolve.backend.model.User;
public class UserService {
    private UserDAO userDAO;
    public UserService() throws SQLException {
    userDAO = new UserDAO();
    }
    public void registerUser(User user) {
        userDAO.registerUser(user);
    }
    public User loginUser(String email, String password){
        return userDAO.loginUser(email, password);
    }

}