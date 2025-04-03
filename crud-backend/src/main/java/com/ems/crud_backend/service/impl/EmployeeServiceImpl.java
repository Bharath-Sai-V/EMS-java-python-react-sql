package com.ems.crud_backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ems.crud_backend.dto.EmployeeDto;
import com.ems.crud_backend.entity.Employee;
import com.ems.crud_backend.exception.ResourceNotFoundException;
import com.ems.crud_backend.mapper.EmployeeMapper;
import com.ems.crud_backend.repository.EmployeeRepository;
import com.ems.crud_backend.service.EmployeeService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService{

	private EmployeeRepository employeeRepository;
	
	@Override
	public EmployeeDto createEmployee(EmployeeDto employeeDto) {
		
		Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
		Employee savedEmployee = employeeRepository.save(employee);
		return EmployeeMapper.mapToEmployeeDto(savedEmployee);
	}

	@Override
	public EmployeeDto getEmployeeById(Long id) {
		Employee employee = employeeRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Employee does not exist for the id : " + id));
		return EmployeeMapper.mapToEmployeeDto(employee);
	}

	@Override
	public List<EmployeeDto> getAllEmployees() {
		List<Employee> employees = employeeRepository.findAll();
		return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee))
				.collect(Collectors.toList());
	}

	@Override
	public EmployeeDto updateEmployee(Long id, EmployeeDto newEmpDetails) {
		
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee does not exist for the id : " + id));
		
		employee.setFirstName(newEmpDetails.getFirstName());
		employee.setLastName(newEmpDetails.getLastName());
		employee.setEmailId(newEmpDetails.getEmailId());
		
		Employee updatedEmployee = employeeRepository.save(employee);
		
		return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
	}

	@Override
	public void deleteEmployee(Long id) {
		
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee does not exist for the id : " + id));
		
		employeeRepository.deleteById(id);
		
	}

}
