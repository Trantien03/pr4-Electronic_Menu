package org.example.projectapi.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.example.projectapi.enums.NotifiStatus;

@Setter
@Getter
@AllArgsConstructor
public class NotificationRequest {

    private long tableId;
    private String message;
}
