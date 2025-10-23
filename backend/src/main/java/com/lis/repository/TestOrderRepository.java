package com.lis.repository;

import com.lis.model.TestOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TestOrderRepository extends JpaRepository<TestOrder, Long> {
    Optional<TestOrder> findByOrderNumber(String orderNumber);
    List<TestOrder> findByPatientId(Long patientId);
    List<TestOrder> findByStatus(TestOrder.OrderStatus status);
}
