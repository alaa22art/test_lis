package com.lis.service;

import com.lis.dto.request.PatientRequestDto;
import com.lis.dto.response.PatientResponseDto;
import com.lis.exception.ResourceNotFoundException;
import com.lis.model.Patient;
import com.lis.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PatientService {

    private final PatientRepository patientRepository;

    /**
     * Register a new patient (admission)
     */
    @Transactional
    public PatientResponseDto admitPatient(PatientRequestDto requestDto) {
        log.info("Admitting new patient with ID: {}", requestDto.getPatientId());

        // Check if patient ID already exists
        patientRepository.findByPatientId(requestDto.getPatientId())
                .ifPresent(p -> {
                    throw new IllegalArgumentException("Patient with ID " + requestDto.getPatientId() + " already exists");
                });

        Patient patient = new Patient();
        mapRequestToEntity(requestDto, patient);

        Patient savedPatient = patientRepository.save(patient);
        log.info("Patient admitted successfully with ID: {}", savedPatient.getId());

        return PatientResponseDto.fromEntity(savedPatient);
    }

    /**
     * Get all active patients
     */
    @Transactional(readOnly = true)
    public List<PatientResponseDto> getAllActivePatients() {
        log.info("Retrieving all active patients");
        return patientRepository.findByIsActiveTrue().stream()
                .map(PatientResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Get all patients (including inactive)
     */
    @Transactional(readOnly = true)
    public List<PatientResponseDto> getAllPatients() {
        log.info("Retrieving all patients");
        return patientRepository.findAll().stream()
                .map(PatientResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Get patient by ID
     */
    @Transactional(readOnly = true)
    public PatientResponseDto getPatientById(Long id) {
        log.info("Retrieving patient with ID: {}", id);
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + id));
        return PatientResponseDto.fromEntity(patient);
    }

    /**
     * Get patient by patient ID
     */
    @Transactional(readOnly = true)
    public PatientResponseDto getPatientByPatientId(String patientId) {
        log.info("Retrieving patient with patient ID: {}", patientId);
        Patient patient = patientRepository.findByPatientId(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with patient ID: " + patientId));
        return PatientResponseDto.fromEntity(patient);
    }

    /**
     * Search patients by query
     */
    @Transactional(readOnly = true)
    public List<PatientResponseDto> searchPatients(String query) {
        log.info("Searching patients with query: {}", query);
        return patientRepository.searchPatients(query).stream()
                .map(PatientResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Update patient information
     */
    @Transactional
    public PatientResponseDto updatePatient(Long id, PatientRequestDto requestDto) {
        log.info("Updating patient with ID: {}", id);

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + id));

        // Check if patient ID is being changed and if it already exists
        if (!patient.getPatientId().equals(requestDto.getPatientId())) {
            patientRepository.findByPatientId(requestDto.getPatientId())
                    .ifPresent(p -> {
                        throw new IllegalArgumentException("Patient with ID " + requestDto.getPatientId() + " already exists");
                    });
        }

        mapRequestToEntity(requestDto, patient);
        Patient updatedPatient = patientRepository.save(patient);

        log.info("Patient updated successfully with ID: {}", updatedPatient.getId());
        return PatientResponseDto.fromEntity(updatedPatient);
    }

    /**
     * Deactivate patient (soft delete)
     */
    @Transactional
    public void deactivatePatient(Long id) {
        log.info("Deactivating patient with ID: {}", id);

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + id));

        patient.setIsActive(false);
        patientRepository.save(patient);

        log.info("Patient deactivated successfully with ID: {}", id);
    }

    /**
     * Activate patient
     */
    @Transactional
    public void activatePatient(Long id) {
        log.info("Activating patient with ID: {}", id);

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + id));

        patient.setIsActive(true);
        patientRepository.save(patient);

        log.info("Patient activated successfully with ID: {}", id);
    }

    /**
     * Delete patient permanently (hard delete)
     */
    @Transactional
    public void deletePatient(Long id) {
        log.info("Deleting patient with ID: {}", id);

        if (!patientRepository.existsById(id)) {
            throw new ResourceNotFoundException("Patient not found with id: " + id);
        }

        patientRepository.deleteById(id);
        log.info("Patient deleted successfully with ID: {}", id);
    }

    /**
     * Helper method to map request DTO to entity
     */
    private void mapRequestToEntity(PatientRequestDto requestDto, Patient patient) {
        patient.setPatientId(requestDto.getPatientId());
        patient.setFirstName(requestDto.getFirstName());
        patient.setLastName(requestDto.getLastName());
        patient.setDateOfBirth(requestDto.getDateOfBirth());
        patient.setGender(requestDto.getGender());
        patient.setPhone(requestDto.getPhone());
        patient.setEmail(requestDto.getEmail());
        patient.setAddress(requestDto.getAddress());
        patient.setCity(requestDto.getCity());
        patient.setState(requestDto.getState());
        patient.setZipCode(requestDto.getZipCode());
        patient.setEmergencyContactName(requestDto.getEmergencyContactName());
        patient.setEmergencyContactPhone(requestDto.getEmergencyContactPhone());
        patient.setIsActive(requestDto.getIsActive() != null ? requestDto.getIsActive() : true);
    }
}
