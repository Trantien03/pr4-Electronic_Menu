package org.example.projectapi.Controller;

import org.example.projectapi.Service.AuthService;
import org.example.projectapi.Service.EmployeeService;
import org.example.projectapi.dto.request.EmployeeRequest;
import org.example.projectapi.dto.response.EmployeeResponse;
import org.example.projectapi.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private AuthService authService;

    @GetMapping
    public List<Employee> getAllCustomer() {
        return employeeService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getCustomerById(@PathVariable Long id) {
        Optional<Employee> publisher = employeeService.findById(id);
        return publisher.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<EmployeeResponse> register(@RequestBody EmployeeRequest employeeRequest) {
        return ResponseEntity.ok(authService.registerEmployee(employeeRequest));
    }


    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateCustomer(@PathVariable Long id, @RequestBody Employee publisherDetails) {
        Optional<Employee> employeeOptional = employeeService.findById(id);

        if (employeeOptional.isPresent()) {
            Employee existingEmployee = employeeOptional.get();

            // Chỉ cập nhật các trường mà được cung cấp và xác thực đầu vào
            existingEmployee.setFullName(publisherDetails.getFullName());
            existingEmployee.setEmail(publisherDetails.getEmail());
            existingEmployee.setPhone(publisherDetails.getPhone());
            existingEmployee.setAge(publisherDetails.getAge());
            existingEmployee.setRoles(publisherDetails.getRoles());

            Employee updatedEmployee = employeeService.save(existingEmployee);
            return ResponseEntity.ok(updatedEmployee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        Optional<Employee> publisher = employeeService.findById(id);
        if (publisher.isPresent()) {
            employeeService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/role")
    public ResponseEntity<List<Employee>> getEmployeeRole(@RequestParam String role) {
        List<Employee> employees = employeeService.getEmployeesByRole(role);
        if (employees.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(employees);
    }
}
