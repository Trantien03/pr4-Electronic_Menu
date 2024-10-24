package org.example.projectapi.Controller;

import org.example.projectapi.Service.AuthService;
import org.example.projectapi.dto.request.EmployeeRequest;
import org.example.projectapi.dto.request.SignInRequest;
import org.example.projectapi.dto.response.EmployeeResponse;
import org.example.projectapi.dto.response.MessageRespone;
import org.example.projectapi.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;


    @PostMapping("/login")
    public ResponseEntity<EmployeeResponse> login(@RequestBody SignInRequest signInRequest) {
        return ResponseEntity.ok(authService.loginUser(signInRequest));
    }

    @PostMapping("/refresh")
    public MessageRespone refresh() {
        return new MessageRespone("success");
    }




}
