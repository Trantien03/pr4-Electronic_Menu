package org.example.projectapi.Repository;

import org.example.projectapi.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmail(String email);

    Optional<Employee> findByPhone(String phone);

    List<Employee> findByRoles_Name(String roleName);
}
