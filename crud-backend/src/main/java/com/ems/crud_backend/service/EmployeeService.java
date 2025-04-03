package com.ems.crud_backend.service;

import java.util.List;

import com.ems.crud_backend.dto.EmployeeDto;

public interface EmployeeService {

	EmployeeDto createEmployee(EmployeeDto employeeDto);

	EmployeeDto getEmployeeById(Long id);

	List<EmployeeDto> getAllEmployees();
	
	EmployeeDto updateEmployee(Long id, EmployeeDto newEmpDetails);
	
	void deleteEmployee(Long id);
}
