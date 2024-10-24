package org.example.projectapi.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.example.projectapi.dto.request.DishRequest;
import org.example.projectapi.enums.StatusOrder;
import org.example.projectapi.model.Dish;

@Getter
@Setter
@AllArgsConstructor
public class OrderItemResponse {
    private long id;
//    private String orderBillNumber;
    private Dish dish;
    private int quantity;
    private double price;
    private String note;

    public OrderItemResponse() {
    }
}
