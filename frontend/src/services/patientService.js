import api from './api';

export const patientService = {
  // Admit a new patient
  admitPatient: async (patientData) => {
    const response = await api.post('/patients', patientData);
    return response.data;
  },

  // Get all active patients
  getAllPatients: async (includeInactive = false) => {
    const response = await api.get('/patients', {
      params: { includeInactive }
    });
    return response.data;
  },

  // Get patient by database ID
  getPatientById: async (id) => {
    const response = await api.get(`/patients/${id}`);
    return response.data;
  },

  // Get patient by patient ID
  getPatientByPatientId: async (patientId) => {
    const response = await api.get(`/patients/patient-id/${patientId}`);
    return response.data;
  },

  // Search patients by query
  searchPatients: async (query) => {
    const response = await api.get('/patients/search', {
      params: { query }
    });
    return response.data;
  },

  // Update patient information
  updatePatient: async (id, patientData) => {
    const response = await api.put(`/patients/${id}`, patientData);
    return response.data;
  },

  // Deactivate patient (soft delete)
  deactivatePatient: async (id) => {
    const response = await api.patch(`/patients/${id}/deactivate`);
    return response.data;
  },

  // Activate patient
  activatePatient: async (id) => {
    const response = await api.patch(`/patients/${id}/activate`);
    return response.data;
  },

  // Delete patient permanently
  deletePatient: async (id) => {
    const response = await api.delete(`/patients/${id}`);
    return response.data;
  },
};

export default patientService;
