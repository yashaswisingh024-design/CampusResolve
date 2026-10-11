package com.campus_resolve.backend.controller;
import java.sql.SQLException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.campus_resolve.backend.model.Feedback;
import com.campus_resolve.backend.service.FeedbackService;
@RestController 
public class FeedbackController {
    private FeedbackService feedbackService;
    public FeedbackController() throws SQLException{
        feedbackService= new FeedbackService();
    }
@PostMapping ("/api/feedback")
public Feedback addFeedback(@RequestBody Feedback feedback){
    return feedbackService.addFeedback(feedback);
}
@GetMapping ("/api/feedback/{complaintId}")
public Feedback getFeedback(@PathVariable int complaintId) throws SQLException{
    return feedbackService.getFeedback(complaintId);
     }
    }
