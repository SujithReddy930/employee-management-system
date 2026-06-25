package com.diyar.employee.controller;

import com.diyar.employee.dto.EmployeeResponseDTO;
import com.diyar.employee.model.Employee;
import com.diyar.employee.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<List<EmployeeResponseDTO>> getAllEmployees() {
        List<EmployeeResponseDTO> result = employeeService.getAllEmployees()
            .stream()
            .map(EmployeeResponseDTO::fromEntity)
            .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id)
            .map(EmployeeResponseDTO::fromEntity)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<EmployeeResponseDTO> createEmployee(@RequestBody Employee employee) {
        try {
            Employee created = employeeService.createEmployee(employee);
            return ResponseEntity.status(HttpStatus.CREATED).body(EmployeeResponseDTO.fromEntity(created));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> updateEmployee(
            @PathVariable Long id,
            @RequestBody Employee employee) {
        try {
            Employee updated = employeeService.updateEmployee(id, employee);
            return ResponseEntity.ok(EmployeeResponseDTO.fromEntity(updated));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        try {
            employeeService.deleteEmployee(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<EmployeeResponseDTO>> searchEmployees(@RequestParam String keyword) {
        List<EmployeeResponseDTO> result = employeeService.searchEmployees(keyword)
            .stream()
            .map(EmployeeResponseDTO::fromEntity)
            .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/department/{departmentId}")
    public ResponseEntity<List<EmployeeResponseDTO>> getByDepartment(@PathVariable Long departmentId) {
        List<EmployeeResponseDTO> result = employeeService.getEmployeesByDepartment(departmentId)
            .stream()
            .map(EmployeeResponseDTO::fromEntity)
            .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<EmployeeResponseDTO>> getByStatus(@PathVariable Employee.EmployeeStatus status) {
        List<EmployeeResponseDTO> result = employeeService.getEmployeesByStatus(status)
            .stream()
            .map(EmployeeResponseDTO::fromEntity)
            .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }
}