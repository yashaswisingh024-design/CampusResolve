package com.campus_resolve.backend.model;

public class Complaint {
    private int complaintId;
    private int userId;
    private String title;
    private String description;
    private String location;
    private String category;
    private String priority;
    private String status;
    private String image;
public int getComplaintId(){
    return complaintId;
}
public int getUserId(){
    return userId;
}
public String getTitle(){
    return title;
}
public String getDescription(){
    return description;
}
public String getLocation(){
    return location;
}
public String getCategory(){
    return category;
}
public String getPriority(){
    return priority;
}
public String getStatus(){
    return status;
}
public String getImage(){
    return image;
}
public void setComplaintId(int complaintId){
this.complaintId=complaintId;
}
public void setUserId(int userId){
this.userId=userId;
}
public void setTitle(String title){
this.title=title;
}
public void setDescription(String description){
this.description=description;
}
public void setLocation(String location){
this.location=location;
}
public void setCategory(String category){
this.category=category;
}
public void setStatus(String status){
this.status=status;
}
public void setPriority(String priority){
this.priority=priority;
}
public void setImage(String image){
this.image=image;
}

    
}
