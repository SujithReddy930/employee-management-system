package com.diyar.employee.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diyar.employee.model.Department;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

    // Find by name
    Optional<Department> findByName(String name);

    // Check if department exists
    boolean existsByName(String name);
}