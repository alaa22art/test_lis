import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Chip,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import patientService from '../../services/patientService';
import PatientForm from './PatientForm';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [includeInactive, setIncludeInactive] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, [includeInactive]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await patientService.getAllPatients(includeInactive);
      setPatients(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch patients: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchPatients();
      return;
    }

    try {
      setLoading(true);
      const response = await patientService.searchPatients(searchQuery);
      setPatients(response.data || []);
    } catch (error) {
      toast.error('Search failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleAdmitPatient = async (patientData) => {
    try {
      await patientService.admitPatient(patientData);
      toast.success('Patient admitted successfully!');
      setOpenForm(false);
      fetchPatients();
    } catch (error) {
      toast.error('Failed to admit patient: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleUpdatePatient = async (patientData) => {
    try {
      await patientService.updatePatient(selectedPatient.id, patientData);
      toast.success('Patient updated successfully!');
      setOpenForm(false);
      setSelectedPatient(null);
      fetchPatients();
    } catch (error) {
      toast.error('Failed to update patient: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleToggleStatus = async (patient) => {
    try {
      if (patient.isActive) {
        await patientService.deactivatePatient(patient.id);
        toast.success('Patient deactivated successfully!');
      } else {
        await patientService.activatePatient(patient.id);
        toast.success('Patient activated successfully!');
      }
      fetchPatients();
    } catch (error) {
      toast.error('Failed to update patient status: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteClick = (patient) => {
    setPatientToDelete(patient);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await patientService.deletePatient(patientToDelete.id);
      toast.success('Patient deleted successfully!');
      setDeleteDialogOpen(false);
      setPatientToDelete(null);
      fetchPatients();
    } catch (error) {
      toast.error('Failed to delete patient: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEditClick = (patient) => {
    setSelectedPatient(patient);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedPatient(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return '-';
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <Box>
          <h1 className="page-title">Patient Admission</h1>
          <p className="page-subtitle">Manage patient admissions and records</p>
        </Box>
      </div>

      <div className="content-card">
        {/* Action Bar */}
        <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            placeholder="Search by name or patient ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            size="small"
            sx={{ minWidth: 300, flexGrow: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            onClick={handleSearch}
            disabled={loading}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setSearchQuery('');
              fetchPatients();
            }}
            disabled={loading}
          >
            Clear
          </Button>
          <Button
            variant="outlined"
            color={includeInactive ? 'primary' : 'inherit'}
            onClick={() => setIncludeInactive(!includeInactive)}
          >
            {includeInactive ? 'Show Active Only' : 'Show All'}
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              setSelectedPatient(null);
              setOpenForm(true);
            }}
          >
            Admit Patient
          </Button>
        </Box>

        {/* Patient Table */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
            <CircularProgress />
          </Box>
        ) : patients.length === 0 ? (
          <Alert severity="info">No patients found. Click "Admit Patient" to register a new patient.</Alert>
        ) : (
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell><strong>Patient ID</strong></TableCell>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Age</strong></TableCell>
                  <TableCell><strong>Gender</strong></TableCell>
                  <TableCell><strong>Contact</strong></TableCell>
                  <TableCell><strong>Admission Date</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id} hover>
                    <TableCell>{patient.patientId}</TableCell>
                    <TableCell>
                      {patient.firstName} {patient.lastName}
                    </TableCell>
                    <TableCell>{calculateAge(patient.dateOfBirth)} years</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>
                      <Typography variant="body2">{patient.phone || '-'}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {patient.email || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>{formatDate(patient.createdAt)}</TableCell>
                    <TableCell>
                      <Chip
                        label={patient.isActive ? 'Active' : 'Inactive'}
                        color={patient.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEditClick(patient)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={patient.isActive ? 'Deactivate' : 'Activate'}>
                        <IconButton
                          size="small"
                          color={patient.isActive ? 'warning' : 'success'}
                          onClick={() => handleToggleStatus(patient)}
                        >
                          {patient.isActive ? (
                            <BlockIcon fontSize="small" />
                          ) : (
                            <CheckCircleIcon fontSize="small" />
                          )}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteClick(patient)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>

      {/* Patient Form Dialog */}
      <PatientForm
        open={openForm}
        onClose={handleCloseForm}
        onSubmit={selectedPatient ? handleUpdatePatient : handleAdmitPatient}
        initialValues={selectedPatient}
        isEdit={!!selectedPatient}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to permanently delete patient{' '}
            <strong>
              {patientToDelete?.firstName} {patientToDelete?.lastName}
            </strong>
            ? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Patients;
