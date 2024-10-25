package org.example.projectapi.Controller;

import org.example.projectapi.Service.AuthService;
import org.example.projectapi.dto.request.SignInRequest;
import org.example.projectapi.dto.response.EmployeeResponse;
import org.example.projectapi.dto.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public MessageResponse refresh() {
        return new MessageResponse("success");
    }




}
