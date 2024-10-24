package org.example.projectapi.Service;

import org.example.projectapi.Repository.EmployeeRepository;
import org.example.projectapi.dto.request.EmployeeRequest;
import org.example.projectapi.dto.request.SignInRequest;
import org.example.projectapi.dto.response.EmployeeResponse;
import org.example.projectapi.dto.response.MessageRespone;
import org.example.projectapi.model.Employee;
import org.example.projectapi.jwt.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTUtils jwtUtils;


    public ResponseEntity<?> deleteEmployee(long id) {
        Optional<Employee> employee = employeeRepository.findById(id);
        if (employee.isPresent()) {
            employeeRepository.deleteById(id);
            return ResponseEntity.ok(new MessageRespone("Deleted Successfully"));
        }
        return ResponseEntity.ok(new MessageRespone("Not found"));
    }

    public boolean checkEmail(String email) {
        Optional<Employee> employee = employeeRepository.findByEmail(email);
        return employee.isPresent();
    }

    public boolean checkPhone(String phone) {
        Optional<Employee> employee = employeeRepository.findByPhone(phone);
        return employee.isPresent();
    }


    public EmployeeResponse registerEmployee(EmployeeRequest employeeRequest) {
        EmployeeResponse newEmployee = new EmployeeResponse();

        try {

            Employee employee = new Employee();
            employee.setFullName(employeeRequest.getFullName());
            employee.setAge(employeeRequest.getAge());
            if (checkPhone(employeeRequest.getPhone())){
                newEmployee.setMessage("Phone already in use");
                return newEmployee;
            }
            employee.setPhone(employeeRequest.getPhone());
            if (checkEmail(employeeRequest.getEmail())) {
                 newEmployee.setMessage("Email already in use");
                 return newEmployee;
            }
            employee.setEmail(employeeRequest.getEmail());
            employee.setPassword(passwordEncoder.encode(employeeRequest.getPassword()));
            employee.setRoles(employeeRequest.getRoles());

            Employee savedUser = employeeRepository.save(employee);
            if(savedUser.getId()>0) {
                newEmployee.setEmployee(savedUser);
                newEmployee.setMessage("Successfully registered");
                newEmployee.setStatusCode(200);
            }

        }catch (Exception e) {
            newEmployee.setMessage(e.getMessage());
            newEmployee.setStatusCode(500);
        }
        return newEmployee;
    }

    public EmployeeResponse loginUser(SignInRequest signInRequest) {
        EmployeeResponse newUser = new EmployeeResponse();
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getEmail(),signInRequest.getPassword()));
            var user = employeeRepository.findByEmail(signInRequest.getEmail()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(),user);
            newUser.setStatusCode(200);
            newUser.setToken(jwt);
            newUser.setRole(user.getRoles());
            newUser.setRefreshToken(refreshToken);
            newUser.setMessage("Successfully logged in");
        }catch (Exception e) {
            newUser.setMessage(e.getMessage());
            newUser.setStatusCode(500);
        }
        return newUser;
    }
}
