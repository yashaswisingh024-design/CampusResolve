package com.campus_resolve.backend.service;

import java.sql.SQLException;

import com.campus_resolve.backend.dao.FeedbackDAO;
import com.campus_resolve.backend.model.Feedback;

public class FeedbackService {
    private FeedbackDAO feedbackDAO;
    public FeedbackService() throws SQLException{
        feedbackDAO=new FeedbackDAO();
    }
    public Feedback addFeedback(Feedback feedback){
        return feedbackDAO.addFeedback(feedback);

    }
    public Feedback getFeedback(int complaintId) throws SQLException{
        return feedbackDAO.getFeedback(complaintId);

    }
    
}
