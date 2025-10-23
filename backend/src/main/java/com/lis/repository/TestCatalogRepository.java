package com.lis.repository;

import com.lis.model.TestCatalog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TestCatalogRepository extends JpaRepository<TestCatalog, Long> {
    Optional<TestCatalog> findByTestCode(String testCode);
    List<TestCatalog> findByCategory(String category);
    List<TestCatalog> findByIsActiveTrue();
}
