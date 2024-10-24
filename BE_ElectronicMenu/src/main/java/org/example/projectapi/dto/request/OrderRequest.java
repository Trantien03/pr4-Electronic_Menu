package org.example.projectapi.dto.request;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.projectapi.enums.OrderType;
import org.example.projectapi.enums.PaymentMethod;
import org.hibernate.annotations.CreationTimestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {
    private String billNumber;

    private String customer;

    private Long restaurantTableId;


    private OrderType type;

    private String coupon;


    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createAt;

    private PaymentMethod payment;

    private double originalPrice;

    private double totalDiscount;
    private double totalPrice;

    private List<OrderItemRequest> orderItems;


}
