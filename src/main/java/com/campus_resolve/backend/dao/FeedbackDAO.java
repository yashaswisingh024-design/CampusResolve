package com.campus_resolve.backend.dao;
import java.sql.*;

import com.campus_resolve.backend.model.Feedback;
public class FeedbackDAO {
    Connection con;
    public FeedbackDAO() throws SQLException{
         con =DriverManager.getConnection("jdbc:mysql://localhost:3306/campus_resolve","root",System.getenv("DB_PASSWORD"));
    }
    public void addFeedback(Feedback feedback){
    String sql="INSERT INTO feedback(complaint_id,user_id,rating,comment) "+" VALUES(?,?,?,?)";
    try(PreparedStatement psmt =con.prepareStatement(sql)){
        psmt.setInt(1,feedback.getComplaintId());
        psmt.setInt(2,feedback.getUserId());
        psmt.setInt(3,feedback.getRating());
        psmt.setString(4,feedback.getComment());
        psmt.executeUpdate();
        System.out.println("Feedback submitted");
    }
    catch (SQLException e) {
    
   System.out.println("Error="+e);
}
}
public Feedback getFeedback(int complaintId) throws SQLException{
    String sql="SELECT *"+ " FROM feedback "+" WHERE complaint_id=?";
    try(PreparedStatement psmt =con.prepareStatement(sql)){
        psmt.setInt(1,complaintId);
        ResultSet rs = psmt.executeQuery();
        if(rs.next()){
            Feedback feedback= new Feedback();
            feedback.setFeedbackId(rs.getInt("feedback_id"));
            feedback.setComplaintId(rs.getInt("complaint_id"));
            feedback.setUserId(rs.getInt("user_id"));
            feedback.setRating(rs.getInt("rating"));
            feedback.setComment(rs.getString("comment"));
            return feedback ;
        }
            return null;
        }
    }
}

