package org.example.projectapi.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import org.example.projectapi.model.Role;

import java.util.Set;
@Getter
@Setter
public class EmployeeRequest {

    @NotNull(message = "Full name is required")
    private String fullName;

    @NotNull(message = "Age is required")
    private int age;

    @Email(message = "Invalid email format")
    @NotNull(message = "Email is required")
    private String email;

    @Pattern(regexp = "^\\d{10}$", message = "Phone number format is invalid")
    @NotNull(message = "Phone number is required")
    private String phone;

    @NotNull(message = "Password is required")
    private String password;

    private Set<Role> roles;


}
