package org.example.projectapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.projectapi.enums.OrderType;
import org.example.projectapi.enums.PaymentMethod;
import org.example.projectapi.enums.StatusOrder;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String billNumber;

    @NotNull(message = "Customer name is required")
    private String customer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "restaurant_id", nullable = true)
    private RestaurantTable restaurantTable;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<OrderItem> orderItems;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id")
    private Event event;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentMethod payment;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusOrder status = StatusOrder.Pending;

    private OrderType type;

    @Column(nullable = false)
    private double originalPrice;

    private double totalDiscount;

    @Column(nullable = false)
    private double totalPrice;


    public void updateTotalPrice() {
        this.totalPrice = Math.abs(this.originalPrice - this.totalDiscount);
    }
}
