package com.lis.controller;

import com.lis.dto.response.ApiResponseDto;
import com.lis.model.Patient;
import com.lis.repository.PatientRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
@RequiredArgsConstructor
@Tag(name = "Patients", description = "Patient management APIs")
public class PatientController {

    private final PatientRepository patientRepository;

    @GetMapping
    @Operation(summary = "Get all patients", description = "Retrieve list of all active patients")
    public ResponseEntity<ApiResponseDto<List<Patient>>> getAllPatients() {
        List<Patient> patients = patientRepository.findByIsActiveTrue();
        return ResponseEntity.ok(ApiResponseDto.success("Patients retrieved successfully", patients));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get patient by ID", description = "Retrieve a specific patient by their ID")
    public ResponseEntity<ApiResponseDto<Patient>> getPatientById(@PathVariable Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));
        return ResponseEntity.ok(ApiResponseDto.success("Patient retrieved successfully", patient));
    }

    @GetMapping("/search")
    @Operation(summary = "Search patients", description = "Search patients by name or patient ID")
    public ResponseEntity<ApiResponseDto<List<Patient>>> searchPatients(@RequestParam String query) {
        List<Patient> patients = patientRepository.searchPatients(query);
        return ResponseEntity.ok(ApiResponseDto.success("Search completed successfully", patients));
    }
}
