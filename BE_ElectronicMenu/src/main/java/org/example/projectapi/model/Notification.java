package org.example.projectapi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.example.projectapi.enums.NotifiStatus;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "table_id")
    private RestaurantTable restaurantTable;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotifiStatus status = NotifiStatus.notReceived;

    @NotNull
    private String message;

    public Notification() {

    }
}
