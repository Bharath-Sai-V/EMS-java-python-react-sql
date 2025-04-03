package com.ems.crud_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ems.crud_backend.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
