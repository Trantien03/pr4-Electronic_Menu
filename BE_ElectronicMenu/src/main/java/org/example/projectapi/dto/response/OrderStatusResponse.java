package org.example.projectapi.dto.response;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.projectapi.enums.StatusOrder;
import org.example.projectapi.model.OrderItem;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderStatusResponse {
    private long id;

    private String billNumber;

    private String nameTable;


    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createAt;

    private StatusOrder status;

    private List<OrderItem> orderItems;
}
