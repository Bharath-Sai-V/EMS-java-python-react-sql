package com.ems.crud_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.ems.crud_backend.entity")
public class CrudBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudBackendApplication.class, args);
	}

}
