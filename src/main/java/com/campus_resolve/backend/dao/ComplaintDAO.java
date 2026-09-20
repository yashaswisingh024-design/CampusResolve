package com.campus_resolve.backend.dao;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.campus_resolve.backend.model.Complaint;
public class ComplaintDAO {
    Connection con;
public ComplaintDAO() throws SQLException{
con=DriverManager.getConnection("jdbc:mysql://localhost:3306/campus_resolve","root",System.getenv("DB_PASSWORD"));
}
public void addComplaint(Complaint complaint) {
    String sql="INSERT INTO complaints(user_id, title, description, location, category, image)"+ 
    " VALUES (?,?,?,?,?,?)";
    try(PreparedStatement psmt =con.prepareStatement(sql)){
        psmt.setInt(1, complaint.getUserId());
        psmt.setString(2, complaint.getTitle());
        psmt.setString(3, complaint.getDescription());
        psmt.setString(4, complaint.getLocation());
        psmt.setString(5, complaint.getCategory());
        psmt.setString(6, complaint.getImage());
        int rows = psmt.executeUpdate();
        System.out.println("Rows inserted: " + rows);
}
catch (SQLException e) {
    System.out.println("Error="+e);
}
}
public List<Complaint> getMyComplaint(int userId) throws SQLException {
    String sql="SELECT *"+" FROM complaints"+" WHERE user_id=?";
     try(PreparedStatement psmt =con.prepareStatement(sql)){
        psmt.setInt(1, userId);
        ResultSet rs =psmt.executeQuery();
        List<Complaint> Comp=new ArrayList<>();
        while(rs.next()){
            Complaint complaint = new Complaint();
            int c=rs.getInt("complaint_id");
            complaint.setComplaintId(c);
            int q=rs.getInt("user_id");
            complaint.setUserId(q);
            String p=rs.getString("title");
            complaint.setTitle(p);
            String a =rs.getString("description");
            complaint.setDescription(a);
            String b =rs.getString("location");
            complaint.setLocation(b);
            String d =rs.getString("category");
            complaint.setCategory(d);
            String s= rs.getString("status");
            complaint.setStatus(s);
            String v= rs.getString("priority");
            complaint.setPriority(v);
            String i=rs.getString("image");
            complaint.setImage(i);
            Comp.add(complaint);
        }
        return Comp;
    }
}
public Complaint getComplaint(int complaint_id) throws SQLException{
    String sql ="SELECT *"+" FROM complaints"+" WHERE complaint_id = ?";
    try(PreparedStatement psmt =con.prepareStatement(sql)){
        psmt.setInt(1,complaint_id);
        ResultSet rs =psmt.executeQuery();
        if(rs.next()){
            Complaint complaint = new Complaint();
            int c=rs.getInt("complaint_id");
            complaint.setComplaintId(c);
            int q=rs.getInt("user_id");
            complaint.setUserId(q);
            String p=rs.getString("title");
            complaint.setTitle(p);
            String a =rs.getString("description");
            complaint.setDescription(a);
            String b =rs.getString("location");
            complaint.setLocation(b);
            String d =rs.getString("category");
            complaint.setCategory(d);
            String s= rs.getString("status");
            complaint.setStatus(s);
            String v= rs.getString("priority");
            complaint.setPriority(v);
            String i=rs.getString("image");
            complaint.setImage(i);
            return complaint;
        }
        return null;
}
}
public List<Complaint> getFilteredComplaints(String category,String priority,String status) throws SQLException {
    String sql="SELECT *"+" FROM complaints"+" WHERE(? IS NULL OR category = ?)"+" AND (? IS NULL OR priority = ?)"+
    " AND (? IS NULL OR status = ?)";
    try(PreparedStatement psmt =con.prepareStatement(sql)){
        psmt.setString(1, category);
        psmt.setString(2, category);
        psmt.setString(3, priority);
        psmt.setString(4, priority);
        psmt.setString(5, status);
        psmt.setString(6, status);
        ResultSet rs =psmt.executeQuery();
        List<Complaint> Comp=new ArrayList<>();
        while(rs.next()){
            Complaint complaint = new Complaint();
            int c=rs.getInt("complaint_id");
            complaint.setComplaintId(c);
            int q=rs.getInt("user_id");
            complaint.setUserId(q);
            String p=rs.getString("title");
            complaint.setTitle(p);
            String a =rs.getString("description");
            complaint.setDescription(a);
            String b =rs.getString("location");
            complaint.setLocation(b);
            String d =rs.getString("category");
            complaint.setCategory(d);
            String s= rs.getString("status");
            complaint.setStatus(s);
            String v= rs.getString("priority");
            complaint.setPriority(v);
            String i=rs.getString("image");
            complaint.setImage(i);
            Comp.add(complaint);
        }
        return Comp;
    }
}
public void updatePriority(int complaintId,String new_priority) {
    String sql = "UPDATE complaints" + " SET priority = ?" +" WHERE complaint_id = ?";
    try(PreparedStatement psmt= con.prepareStatement(sql)){
        psmt.setString(1,new_priority);
        psmt.setInt(2,complaintId);
        psmt.executeUpdate();
        System.out.println("Updated successfully");
    }
    catch (SQLException e) {
    System.out.println("Error="+e);
}
}
public void updateStatus(int complaintId,String new_status) {
    String sql = "UPDATE complaints" + " SET status = ?" +" WHERE complaint_id = ?";
    try(PreparedStatement psmt= con.prepareStatement(sql)){
        psmt.setString(1,new_status);
        psmt.setInt(2,complaintId);
        psmt.executeUpdate();
        System.out.println("Updated successfully");
    }
    catch (SQLException e) {
    System.out.println("Error="+e);
}
}
public int getTotalComplaint()throws SQLException{
    String sql ="SELECT COUNT(*)"+" FROM complaints";
    try(PreparedStatement psmt=con.prepareStatement(sql)){
        ResultSet rs=psmt.executeQuery();
        rs.next();
            return rs.getInt(1);
        }
        
}
public int getComplaintCountByStatus(String status) throws SQLException{
    String sql="SELECT COUNT(*)"+" FROM complaints"+" WHERE status = ?";
    try(PreparedStatement psmt =con.prepareStatement(sql)){
        psmt.setString(1,status);
        ResultSet rs =psmt.executeQuery();
        rs.next();
        return rs.getInt(1);
    }
}

}



