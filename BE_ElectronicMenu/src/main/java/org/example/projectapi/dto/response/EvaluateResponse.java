package org.example.projectapi.dto.response;

import java.util.ArrayList;
import java.util.List;

public class EvaluateResponse {
    private long id;
    private double rating; // Giả sử bạn có trường rating kiểu double
    private String phone;
    private String description;
    private List<String> additionalInfo; // Thông tin bổ sung

    // Constructor với tất cả các trường
    public EvaluateResponse(long id, double rating, String phone, String description, List<String> additionalInfo) {
        this.id = id;
        this.rating = rating;
        this.phone = phone;
        this.description = description;
        this.additionalInfo = (additionalInfo != null) ? additionalInfo : new ArrayList<>();
    }

    // Constructor không tham số
    public EvaluateResponse() {
        this.additionalInfo = new ArrayList<>();
    }

    // Getters và Setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

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

    public List<String> getAdditionalInfo() {
        return additionalInfo;
    }

    public void setAdditionalInfo(List<String> additionalInfo) {
        this.additionalInfo = (additionalInfo != null) ? additionalInfo : new ArrayList<>();
    }
}
