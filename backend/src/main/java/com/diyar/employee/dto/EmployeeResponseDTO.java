package com.diyar.employee.dto;

import com.diyar.employee.model.Employee;
import lombok.Data;
import java.time.LocalDate;

@Data
public class EmployeeResponseDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String position;
    private Double salary;
    private LocalDate joiningDate;
    private Employee.EmployeeStatus status;
    private Long departmentId;
    private String departmentName;

    public static EmployeeResponseDTO fromEntity(Employee emp) {
        EmployeeResponseDTO dto = new EmployeeResponseDTO();
        dto.setId(emp.getId());
        dto.setFirstName(emp.getFirstName());
        dto.setLastName(emp.getLastName());
        dto.setEmail(emp.getEmail());
        dto.setPhone(emp.getPhone());
        dto.setPosition(emp.getPosition());
        dto.setSalary(emp.getSalary());
        dto.setJoiningDate(emp.getJoiningDate());
        dto.setStatus(emp.getStatus());
        if (emp.getDepartment() != null) {
            dto.setDepartmentId(emp.getDepartment().getId());
            dto.setDepartmentName(emp.getDepartment().getName());
        }
        return dto;
    }
}