package org.example.projectapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.example.projectapi.enums.StatusTable;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class RestaurantTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String nameTable;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false )
    private StatusTable status = StatusTable.Available;

    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL,mappedBy = "restaurantTable")
    @JsonIgnore
    private List<Orders> order;







    public RestaurantTable() {

    }

}
