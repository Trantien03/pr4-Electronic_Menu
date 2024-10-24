package org.example.projectapi.dto.response;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.projectapi.enums.OrderType;
import org.example.projectapi.enums.PaymentMethod;
import org.example.projectapi.enums.StatusOrder;
import org.example.projectapi.model.OrderItem;
import org.example.projectapi.model.RestaurantTable;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {
    private long id;

    private String billNumber;

    private String nameCustomer;

    private RestaurantTable table;

    private List<OrderItemResponse> items;

    private String coupon;

    private OrderType type;


    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createAt;

    private StatusOrder status;


    @NotNull
    private double originalPrice;

    private double totalDiscount;
    @NotNull
    private double totalPrice;


}
