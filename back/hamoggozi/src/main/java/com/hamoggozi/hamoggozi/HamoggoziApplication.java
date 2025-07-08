package com.hamoggozi.hamoggozi;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication()
@MapperScan(basePackages = "com.hamoggozi.hamoggozi.dao")
public class HamoggoziApplication {

	public static void main(String[] args) {
		SpringApplication.run(HamoggoziApplication.class, args);
	}

}
