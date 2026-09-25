package com.campus_resolve.backend.controller;
import com.campus_resolve.backend.service.ComplaintService;
import java.sql.SQLException;
import java.util.List;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.campus_resolve.backend.model.Complaint;
import com.campus_resolve.backend.model.Dashboard;
@RestController
public class ComplaintController {
    private ComplaintService complaintService;
    public ComplaintController() throws SQLException {
    complaintService = new ComplaintService();
}
@PostMapping("/api/complaints")
public Complaint complaints(@RequestBody Complaint complaint) {
    return complaintService.addComplaint(complaint);
}
@GetMapping("/api/complaints/my")
public List<Complaint> complaints(@RequestParam int userId) throws SQLException{
return complaintService.getMyComplaint(userId);
}
@GetMapping ("/api/complaints/{complaintId}")
public Complaint complaint(@PathVariable int complaintId) throws SQLException{
    return complaintService.getComplaint(complaintId);
}
@GetMapping ("/api/admin/complaints")
public List<Complaint> filteredcomplaints(@RequestParam(required = false) String category,@RequestParam(required = false) String priority,@RequestParam(required = false) String status) throws SQLException{
    return complaintService.getFilteredComplaints(category, priority, status);
}
@GetMapping ("/api/admin/complaints/{complaintId}")
public Complaint admincomplaint(@PathVariable int complaintId) throws SQLException{
     Complaint complaint=complaintService.getComplaint(complaintId);
     return complaint;
}
@PutMapping ("/api/admin/complaints/{complaintId}/priority")
public String updatePriority(@PathVariable int complaintId,@RequestParam String priority){
    complaintService.updatePriority(complaintId,priority);
    return "Priority updated successfully";
}
@PutMapping ("/api/admin/complaints/{complaintId}/status")
public String updateStatus(@PathVariable int complaintId,@RequestParam String status){
    complaintService.updateStatus(complaintId,status);
    return "Status updated successfully";
}
@GetMapping ("/api/admin/dashboard")
public int getTotalComplaint() throws SQLException{
    return complaintService.getTotalComplaint();
}
@GetMapping("/api/admin/dashboard/full")
public Dashboard getDashboard() throws SQLException {
    return complaintService.getDashboard();
}
}

