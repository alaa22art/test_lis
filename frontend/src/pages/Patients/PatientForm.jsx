import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';

const PatientFormSchema = Yup.object().shape({
  patientId: Yup.string()
    .required('Patient ID is required')
    .max(50, 'Patient ID must not exceed 50 characters'),
  firstName: Yup.string()
    .required('First name is required')
    .max(100, 'First name must not exceed 100 characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .max(100, 'Last name must not exceed 100 characters'),
  dateOfBirth: Yup.date()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth must be in the past'),
  gender: Yup.string()
    .required('Gender is required')
    .oneOf(['MALE', 'FEMALE', 'OTHER'], 'Invalid gender'),
  phone: Yup.string()
    .matches(/^[0-9+\-\s()]*$/, 'Invalid phone number format')
    .max(20, 'Phone number must not exceed 20 characters'),
  email: Yup.string()
    .email('Invalid email format')
    .max(100, 'Email must not exceed 100 characters'),
  address: Yup.string().max(500, 'Address must not exceed 500 characters'),
  city: Yup.string().max(100, 'City must not exceed 100 characters'),
  state: Yup.string().max(100, 'State must not exceed 100 characters'),
  zipCode: Yup.string().max(20, 'Zip code must not exceed 20 characters'),
  emergencyContactName: Yup.string().max(100, 'Emergency contact name must not exceed 100 characters'),
  emergencyContactPhone: Yup.string()
    .matches(/^[0-9+\-\s()]*$/, 'Invalid emergency contact phone format')
    .max(20, 'Emergency contact phone must not exceed 20 characters'),
});

const PatientForm = ({ open, onClose, onSubmit, initialValues, isEdit = false }) => {
  const defaultValues = {
    patientId: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    isActive: true,
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6">
          {isEdit ? 'Edit Patient' : 'Admit New Patient'}
        </Typography>
      </DialogTitle>
      <Formik
        initialValues={initialValues || defaultValues}
        validationSchema={PatientFormSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
        }}
        enableReinitialize
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <DialogContent>
              <Grid container spacing={3}>
                {/* Basic Information */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Basic Information
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="patientId"
                    label="Patient ID *"
                    fullWidth
                    disabled={isEdit}
                    error={touched.patientId && Boolean(errors.patientId)}
                    helperText={touched.patientId && errors.patientId}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="gender"
                    label="Gender *"
                    select
                    fullWidth
                    error={touched.gender && Boolean(errors.gender)}
                    helperText={touched.gender && errors.gender}
                  >
                    <MenuItem value="MALE">Male</MenuItem>
                    <MenuItem value="FEMALE">Female</MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                  </Field>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="firstName"
                    label="First Name *"
                    fullWidth
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="lastName"
                    label="Last Name *"
                    fullWidth
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="dateOfBirth"
                    label="Date of Birth *"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
                    helperText={touched.dateOfBirth && errors.dateOfBirth}
                  />
                </Grid>

                {/* Contact Information */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="primary" gutterBottom sx={{ mt: 2 }}>
                    Contact Information
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="phone"
                    label="Phone"
                    fullWidth
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="address"
                    label="Address"
                    fullWidth
                    multiline
                    rows={2}
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    error={touched.city && Boolean(errors.city)}
                    helperText={touched.city && errors.city}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Field
                    as={TextField}
                    name="state"
                    label="State"
                    fullWidth
                    error={touched.state && Boolean(errors.state)}
                    helperText={touched.state && errors.state}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Field
                    as={TextField}
                    name="zipCode"
                    label="Zip Code"
                    fullWidth
                    error={touched.zipCode && Boolean(errors.zipCode)}
                    helperText={touched.zipCode && errors.zipCode}
                  />
                </Grid>

                {/* Emergency Contact */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="primary" gutterBottom sx={{ mt: 2 }}>
                    Emergency Contact
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="emergencyContactName"
                    label="Emergency Contact Name"
                    fullWidth
                    error={touched.emergencyContactName && Boolean(errors.emergencyContactName)}
                    helperText={touched.emergencyContactName && errors.emergencyContactName}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="emergencyContactPhone"
                    label="Emergency Contact Phone"
                    fullWidth
                    error={touched.emergencyContactPhone && Boolean(errors.emergencyContactPhone)}
                    helperText={touched.emergencyContactPhone && errors.emergencyContactPhone}
                  />
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={onClose} color="inherit">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                {isEdit ? 'Update Patient' : 'Admit Patient'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default PatientForm;
