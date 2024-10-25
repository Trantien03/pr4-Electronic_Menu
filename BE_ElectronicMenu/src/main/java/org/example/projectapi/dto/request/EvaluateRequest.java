package org.example.projectapi.dto.request;

import java.util.List;

public class EvaluateRequest {
    private String phone;
    private String description;
    private int rating;
    private List<String> feedbackReasons;
    private Long tableId; // Thêm thuộc tính tableId


    // Getters và setters
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public List<String> getFeedbackReasons() {
        return feedbackReasons;
    }

    public void setFeedbackReasons(List<String> feedbackReasons) {
        this.feedbackReasons = feedbackReasons;
    }

    public Long getTableId() {
        return tableId;
    }

    public void setTableId(Long tableId) {
        this.tableId = tableId;
    }
}
