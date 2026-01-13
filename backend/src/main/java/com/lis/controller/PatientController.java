package com.lis.controller;

import com.lis.dto.request.PatientRequestDto;
import com.lis.dto.response.ApiResponseDto;
import com.lis.dto.response.PatientResponseDto;
import com.lis.service.PatientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
@Tag(name = "Patients", description = "Patient admission and management APIs")
public class PatientController {

    private final PatientService patientService;

    @PostMapping
    @Operation(summary = "Admit new patient", description = "Register a new patient admission")
    public ResponseEntity<ApiResponseDto<PatientResponseDto>> admitPatient(
            @Valid @RequestBody PatientRequestDto requestDto) {
        PatientResponseDto patient = patientService.admitPatient(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDto.success("Patient admitted successfully", patient));
    }

    @GetMapping
    @Operation(summary = "Get all active patients", description = "Retrieve list of all active patients")
    public ResponseEntity<ApiResponseDto<List<PatientResponseDto>>> getAllPatients(
            @RequestParam(required = false, defaultValue = "false") boolean includeInactive) {
        List<PatientResponseDto> patients = includeInactive
                ? patientService.getAllPatients()
                : patientService.getAllActivePatients();
        return ResponseEntity.ok(ApiResponseDto.success("Patients retrieved successfully", patients));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get patient by ID", description = "Retrieve a specific patient by their database ID")
    public ResponseEntity<ApiResponseDto<PatientResponseDto>> getPatientById(@PathVariable Long id) {
        PatientResponseDto patient = patientService.getPatientById(id);
        return ResponseEntity.ok(ApiResponseDto.success("Patient retrieved successfully", patient));
    }

    @GetMapping("/patient-id/{patientId}")
    @Operation(summary = "Get patient by patient ID", description = "Retrieve a specific patient by their patient ID")
    public ResponseEntity<ApiResponseDto<PatientResponseDto>> getPatientByPatientId(@PathVariable String patientId) {
        PatientResponseDto patient = patientService.getPatientByPatientId(patientId);
        return ResponseEntity.ok(ApiResponseDto.success("Patient retrieved successfully", patient));
    }

    @GetMapping("/search")
    @Operation(summary = "Search patients", description = "Search patients by name or patient ID")
    public ResponseEntity<ApiResponseDto<List<PatientResponseDto>>> searchPatients(@RequestParam String query) {
        List<PatientResponseDto> patients = patientService.searchPatients(query);
        return ResponseEntity.ok(ApiResponseDto.success("Search completed successfully", patients));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update patient", description = "Update patient information")
    public ResponseEntity<ApiResponseDto<PatientResponseDto>> updatePatient(
            @PathVariable Long id,
            @Valid @RequestBody PatientRequestDto requestDto) {
        PatientResponseDto patient = patientService.updatePatient(id, requestDto);
        return ResponseEntity.ok(ApiResponseDto.success("Patient updated successfully", patient));
    }

    @PatchMapping("/{id}/deactivate")
    @Operation(summary = "Deactivate patient", description = "Deactivate a patient record (soft delete)")
    public ResponseEntity<ApiResponseDto<Void>> deactivatePatient(@PathVariable Long id) {
        patientService.deactivatePatient(id);
        return ResponseEntity.ok(ApiResponseDto.success("Patient deactivated successfully", null));
    }

    @PatchMapping("/{id}/activate")
    @Operation(summary = "Activate patient", description = "Activate a deactivated patient record")
    public ResponseEntity<ApiResponseDto<Void>> activatePatient(@PathVariable Long id) {
        patientService.activatePatient(id);
        return ResponseEntity.ok(ApiResponseDto.success("Patient activated successfully", null));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete patient", description = "Permanently delete a patient record")
    public ResponseEntity<ApiResponseDto<Void>> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.ok(ApiResponseDto.success("Patient deleted successfully", null));
    }
}
