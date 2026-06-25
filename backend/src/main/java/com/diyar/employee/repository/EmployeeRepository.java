package com.diyar.employee.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.diyar.employee.model.Employee;
import com.diyar.employee.model.Employee.EmployeeStatus;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // Find by email
    Optional<Employee> findByEmail(String email);

    // Find by department
    List<Employee> findByDepartmentId(Long departmentId);

    // Find by status
    List<Employee> findByStatus(Employee.EmployeeStatus status);

    // Search by name
    @Query("SELECT e FROM Employee e WHERE " +
           "LOWER(e.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(e.lastName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(e.email) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Employee> searchEmployees(@Param("keyword") String keyword);

    // Find by position
    List<Employee> findByPosition(String position);
}