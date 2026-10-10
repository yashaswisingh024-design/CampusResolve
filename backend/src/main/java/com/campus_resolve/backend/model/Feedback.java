package com.campus_resolve.backend.model;

public class Feedback {
private int feedbackId;
private int complaintId;
private int userId;
private int rating; 
private String comment;
public int getFeedbackId(){
    return feedbackId;
}
public int getComplaintId(){
    return complaintId;
}
public int getUserId(){
    return userId;
}
public int getRating(){
    return rating;
}
public String getComment(){
    return comment;
}
public void setFeedbackId(int feedbackId){
   this.feedbackId=feedbackId;
}
public void setComplaintId(int complaintId ){
   this.complaintId=complaintId;
}
public void setUserId(int userId){
   this.userId=userId;
}
public void setRating(int rating ){
   this.rating =rating;
}
public void setComment(String comment){
    this.comment =comment;
}
}

