package com.campus_resolve.backend.service;
import com.campus_resolve.backend.dao.ComplaintDAO;
import com.campus_resolve.backend.model.Complaint;
import com.campus_resolve.backend.model.Dashboard;
import java.sql.SQLException;
import java.util.List;
public class ComplaintService {
    private ComplaintDAO complaintDAO;
public ComplaintService() throws SQLException{
    complaintDAO= new ComplaintDAO();
}
public Complaint addComplaint(Complaint complaint){
    return complaintDAO.addComplaint(complaint);
}
public List<Complaint> getMyComplaint(int userId) throws SQLException{
    return complaintDAO.getMyComplaint(userId);

}
public Complaint getComplaint(int complaintId) throws SQLException{
    return complaintDAO.getComplaint( complaintId);
}
public List<Complaint> getFilteredComplaints(String category,String priority,String status) throws SQLException{
    return complaintDAO.getFilteredComplaints(category,priority,status);
}
public void updatePriority(int complaintId,String priority){
     complaintDAO.updatePriority(complaintId,priority);
}
public void updateStatus(int complaintId,String status){
     complaintDAO.updateStatus(complaintId,status);
}
public int getTotalComplaint() throws SQLException{
   return complaintDAO.getTotalComplaint();
}
public int getComplaintCountByStatus(String status) throws SQLException{
    return complaintDAO.getComplaintCountByStatus(status);
}
public Dashboard getDashboard() throws SQLException{
    Dashboard dashboard= new Dashboard();
    dashboard.setTotal(complaintDAO.getTotalComplaint());
    dashboard.setInProgress(complaintDAO.getComplaintCountByStatus("IN PROGRESS"));
    dashboard.setResolved(complaintDAO.getComplaintCountByStatus("RESOLVED"));
    dashboard.setUnderReview(complaintDAO.getComplaintCountByStatus("UNDER REVIEW"));
    dashboard.setSubmitted(complaintDAO.getComplaintCountByStatus("SUBMITTED"));
    return dashboard;
}
}

