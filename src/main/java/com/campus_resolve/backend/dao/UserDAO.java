package com.campus_resolve.backend.dao;
import java.sql.*;
import com.campus_resolve.backend.model.User;
public class UserDAO {
Connection con;
public UserDAO() throws SQLException{
con=DriverManager.getConnection("jdbc:mysql://localhost:3306/campus_resolve","root",System.getenv("DB_PASSWORD"));
}
public boolean registerUser(User user){
    String sql ="INSERT INTO users(name,email,password,role) "+ "VALUES(?,?,?,?)";
    try(PreparedStatement psmt =con.prepareStatement(sql)){
    psmt.setString(1,user.getName());
    psmt.setString(2,user.getEmail());
    psmt.setString(3,user.getPassword());
    psmt.setString(4,"STUDENT");
    int rows = psmt.executeUpdate();
    System.out.println("Rows inserted: " + rows);
      return true;
}

catch (SQLException e) {
    
   System.out.println("Error="+e);
   return false;
}
}
public User loginUser(String email,String password) {
   String sql = "SELECT name,email,password,role"+" FROM users "+" WHERE email=?"+" AND password=?";
  try( PreparedStatement psmt = con.prepareStatement(sql)){
   psmt.setString(1,email);
   psmt.setString(2,password);
   ResultSet rs = psmt.executeQuery();
   if(rs.next()){
   User user = new User();
   user.setName(rs.getString("name"));
   user.setEmail(rs.getString("email"));
   user.setPassword(rs.getString("password"));
   user.setRole(rs.getString("role"));
   return user;
   }
   else{
   return null;
   }
}
   catch (SQLException e) {
    System.out.println("Error="+e);
    return null;
}
}  
}
