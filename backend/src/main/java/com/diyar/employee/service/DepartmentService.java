package com.diyar.employee.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.diyar.employee.model.Department;
import com.diyar.employee.repository.DepartmentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    // Get all departments
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    // Get department by ID
    public Optional<Department> getDepartmentById(Long id) {
        return departmentRepository.findById(id);
    }

    // Create department
    public Department createDepartment(Department department) {
        if (departmentRepository.existsByName(department.getName())) {
            throw new RuntimeException("Department already exists: " + department.getName());
        }
        return departmentRepository.save(department);
    }

    // Update department
    public Department updateDepartment(Long id, Department updatedDepartment) {
        Department existing = departmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Department not found with id: " + id));

        existing.setName(updatedDepartment.getName());
        existing.setDescription(updatedDepartment.getDescription());
        existing.setManagerName(updatedDepartment.getManagerName());
        existing.setLocation(updatedDepartment.getLocation());

        return departmentRepository.save(existing);
    }

    // Delete department
    public void deleteDepartment(Long id) {
        if (!departmentRepository.existsById(id)) {
            throw new RuntimeException("Department not found with id: " + id);
        }
        departmentRepository.deleteById(id);
    }
}