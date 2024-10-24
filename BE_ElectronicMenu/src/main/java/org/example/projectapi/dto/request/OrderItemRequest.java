package org.example.projectapi.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemRequest {
    private long dish_id;
    private int quantity;
    private double price;
    private String note;
}
