package com.lis.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "test_catalog")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class TestCatalog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "test_code", nullable = false, unique = true, length = 50)
    private String testCode;

    @Column(name = "test_name", nullable = false, length = 200)
    private String testName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 100)
    private String category;

    @Column(name = "sample_type", nullable = false, length = 50)
    private String sampleType;

    @Column(length = 50)
    private String unit;

    @Column(name = "reference_range_min", precision = 10, scale = 2)
    private BigDecimal referenceRangeMin;

    @Column(name = "reference_range_max", precision = 10, scale = 2)
    private BigDecimal referenceRangeMax;

    @Column(name = "turnaround_time_hours")
    private Integer turnaroundTimeHours;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
