package com.lis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class LisApplication {

    public static void main(String[] args) {
        SpringApplication.run(LisApplication.class, args);
        System.out.println("==============================================");
        System.out.println("LIS Backend Application Started Successfully!");
        System.out.println("API Documentation: http://localhost:8080/api/swagger-ui.html");
        System.out.println("==============================================");
    }
}
