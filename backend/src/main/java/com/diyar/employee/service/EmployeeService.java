package com.diyar.employee.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.diyar.employee.model.Employee;
import com.diyar.employee.repository.DepartmentRepository;
import com.diyar.employee.repository.EmployeeRepository;
import com.diyar.employee.model.Department;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    // Get all employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Get employee by ID
    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    // Create employee
    public Employee createEmployee(Employee employee) {
    if (employeeRepository.findByEmail(employee.getEmail()).isPresent()) {
        throw new RuntimeException("Employee with email already exists: " + employee.getEmail());
    }
    if (employee.getDepartment() != null && employee.getDepartment().getId() != null) {
        Department fullDepartment = departmentRepository.findById(employee.getDepartment().getId())
            .orElseThrow(() -> new RuntimeException("Department not found with id: " + employee.getDepartment().getId()));
        employee.setDepartment(fullDepartment);
    }
    return employeeRepository.save(employee);
}

    // Update employee
    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        Employee existing = employeeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));

        existing.setFirstName(updatedEmployee.getFirstName());
        existing.setLastName(updatedEmployee.getLastName());
        existing.setEmail(updatedEmployee.getEmail());
        existing.setPhone(updatedEmployee.getPhone());
        existing.setPosition(updatedEmployee.getPosition());
        existing.setSalary(updatedEmployee.getSalary());
        existing.setStatus(updatedEmployee.getStatus());
        if (updatedEmployee.getDepartment() != null && updatedEmployee.getDepartment().getId() != null) {
    Department fullDepartment = departmentRepository.findById(updatedEmployee.getDepartment().getId())
        .orElseThrow(() -> new RuntimeException("Department not found with id: " + updatedEmployee.getDepartment().getId()));
    existing.setDepartment(fullDepartment);
} else {
    existing.setDepartment(null);
}

        return employeeRepository.save(existing);
    }

    // Delete employee
    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new RuntimeException("Employee not found with id: " + id);
        }
        employeeRepository.deleteById(id);
    }

    // Search employees
    public List<Employee> searchEmployees(String keyword) {
        return employeeRepository.searchEmployees(keyword);
    }

    // Get employees by department
    public List<Employee> getEmployeesByDepartment(Long departmentId) {
        return employeeRepository.findByDepartmentId(departmentId);
    }

    // Get employees by status
    public List<Employee> getEmployeesByStatus(Employee.EmployeeStatus status) {
        return employeeRepository.findByStatus(status);
    }
}