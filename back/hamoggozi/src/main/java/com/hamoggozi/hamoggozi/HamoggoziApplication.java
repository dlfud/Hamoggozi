package com.hamoggozi.hamoggozi;

import jakarta.annotation.PostConstruct;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication
@MapperScan("com.hamoggozi.hamoggozi.dao")
public class HamoggoziApplication {

	public static void main(String[] args) {
		SpringApplication.run(HamoggoziApplication.class, args);
	}

}
