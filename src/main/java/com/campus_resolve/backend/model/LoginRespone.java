package com.campus_resolve.backend.model;

public class LoginRespone {
    private int userId;
 private String name;
private String email;
private String role;
public int getUserId(){
    return userId;
}
public String getName(){
    return name;
}
public String getEmail(){
    return email;
}
public String getRole(){
    return role;
}
public void setName(String name){
   this.name=name;
}
public void setEmail(String email){
   this.email=email;
}
public void setRole(String role){
   this.role=role;
}
public void setUserId(int userId){
    this.userId = userId;
}
}
   

