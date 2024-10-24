package org.example.projectapi.dto.request;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class EventRequest {

    @Column(nullable = false )
    private String name;

    @Column(nullable = false )
    private double discount;

    private Date startDay;

    private Date endDay;

}
