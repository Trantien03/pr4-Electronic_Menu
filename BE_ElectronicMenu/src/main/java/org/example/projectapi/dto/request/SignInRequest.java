package org.example.projectapi.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignInRequest {

    @NotBlank(message = "Email not null")
    private String email;

    @NotBlank(message = "Password not null")
    private String password;

}
