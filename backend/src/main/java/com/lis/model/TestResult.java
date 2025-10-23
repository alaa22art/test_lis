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
@Table(name = "test_results")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class TestResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_order_id", nullable = false)
    private TestOrder testOrder;

    @Column(name = "result_value", length = 500)
    private String resultValue;

    @Column(name = "result_numeric", precision = 10, scale = 2)
    private BigDecimal resultNumeric;

    @Column(name = "result_text", columnDefinition = "TEXT")
    private String resultText;

    @Column(length = 50)
    private String unit;

    @Column(name = "reference_range", length = 100)
    private String referenceRange;

    @Column(name = "is_abnormal")
    private Boolean isAbnormal = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tested_by")
    private User testedBy;

    @Column(name = "tested_date")
    private LocalDateTime testedDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "verified_by")
    private User verifiedBy;

    @Column(name = "verified_date")
    private LocalDateTime verifiedDate;

    @Column(length = 50)
    @Enumerated(EnumType.STRING)
    private ResultStatus status = ResultStatus.PENDING;

    @Column(columnDefinition = "TEXT")
    private String comments;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum ResultStatus {
        PENDING, PRELIMINARY, VERIFIED, CORRECTED
    }
}
