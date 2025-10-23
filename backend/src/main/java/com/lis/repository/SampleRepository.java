package com.lis.repository;

import com.lis.model.Sample;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SampleRepository extends JpaRepository<Sample, Long> {
    Optional<Sample> findBySampleBarcode(String sampleBarcode);
    List<Sample> findByPatientId(Long patientId);
    List<Sample> findByStatus(Sample.SampleStatus status);
}
