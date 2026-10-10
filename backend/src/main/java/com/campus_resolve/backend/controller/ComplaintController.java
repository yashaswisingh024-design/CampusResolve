package com.campus_resolve.backend.controller;
import com.campus_resolve.backend.service.ComplaintService;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import com.campus_resolve.backend.util.FileUploadUtil;
import com.campus_resolve.backend.model.Complaint;
import com.campus_resolve.backend.model.Dashboard;
@RestController
public class ComplaintController {
    private ComplaintService complaintService;
    public ComplaintController() throws SQLException {
    complaintService = new ComplaintService();
}
@PostMapping("/api/complaints")
public Complaint complaints(
@RequestPart("complaint") Complaint complaint,
@RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
Complaint savedComplaint = complaintService.addComplaint(complaint);
if (image != null && !image.isEmpty()) {
 String imageName = FileUploadUtil.saveFile(image,savedComplaint.getComplaintId());
complaintService.updateImage(savedComplaint.getComplaintId(),imageName);
savedComplaint.setImage(imageName);
}
return savedComplaint;
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
@GetMapping("/api/complaints/images/{fileName:.+}")
public ResponseEntity<Resource> getImage(@PathVariable String fileName) throws IOException {
Path uploadPath = Paths.get("uploads").toAbsolutePath().normalize();
Path filePath = uploadPath.resolve(fileName).normalize();
if (!filePath.startsWith(uploadPath)) {
        return ResponseEntity.badRequest().build();
    }
Resource resource = new UrlResource(filePath.toUri());
if (!resource.exists() || !resource.isReadable()) {
        return ResponseEntity.notFound().build();
    }
String contentType = Files.probeContentType(filePath);
if (contentType == null) {
        contentType = "application/octet-stream";
    }
    return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(contentType))
            .body(resource);
}
}

