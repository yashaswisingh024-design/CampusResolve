package com.campus_resolve.backend.model;

public class Dashboard {
    private int total;
    private int submitted;
    private int underReview;
    private int inProgress;
    private int resolved;
public int getTotal(){
    return total;
}
public int getSubmitted(){
    return submitted;
}
public int getUnderReview(){
    return underReview;
}
public int getInProgress(){
    return inProgress;
}
public int getResolved(){
    return resolved;
}
public void setTotal(int total){
   this.total=total;
}
public void setSubmitted(int submitted ){
   this.submitted=submitted;
}
public void setUnderReview(int underReview ){
   this.underReview=underReview;
}
public void setInProgress(int inProgress ){
   this.inProgress=inProgress;
}
public void setResolved(int resolved ){
   this.resolved=resolved;
}
}
