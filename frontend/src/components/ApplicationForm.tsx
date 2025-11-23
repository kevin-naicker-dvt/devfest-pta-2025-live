import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  MenuItem,
  Paper,
  Chip,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { applicationsApi } from '../api/applicationsApi';
import { CandidateProfile } from '../types';

interface ApplicationFormProps {
  candidate: CandidateProfile;
}

const POSITIONS = [
  'Senior Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Cloud Architect',
  'Data Scientist',
  'Product Manager',
  'UX/UI Designer',
  'QA Engineer',
];

const ApplicationForm: React.FC<ApplicationFormProps> = ({ candidate }) => {
  const [position, setPosition] = useState('');
  const [cvFilename, setCvFilename] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSimulateUpload = () => {
    // Simulate CV upload
    const filename = `CV_${candidate.candidateName}_${Date.now()}.pdf`;
    setCvFilename(filename);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!position) {
      setError('Please select a position');
      return;
    }

    if (!cvFilename) {
      setError('Please upload your CV');
      return;
    }

    setLoading(true);

    try {
      await applicationsApi.create({
        candidateName: candidate.candidateName,
        email: candidate.email,
        fullName: candidate.fullName,
        position,
        cvFilename,
      });

      setSuccess(true);
      setPosition('');
      setCvFilename('');

      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Apply for a Position
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Submit your application to join our team at DevFest PTA 2025!
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 3 }} icon={<CheckCircleIcon />}>
            Application submitted successfully! Check "My Applications" to see the status.
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Card sx={{ boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: 'grey.50' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Candidate Information
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip label={`Username: ${candidate.candidateName}`} />
                  <Chip label={`Email: ${candidate.email}`} />
                  <Chip label={`Full Name: ${candidate.fullName}`} />
                </Box>
              </Paper>

              <TextField
                fullWidth
                select
                label="Position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                margin="normal"
                required
                helperText="Select the position you're applying for"
              >
                {POSITIONS.map((pos) => (
                  <MenuItem key={pos} value={pos}>
                    {pos}
                  </MenuItem>
                ))}
              </TextField>

              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  CV Upload (Simulated)
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Button
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    onClick={handleSimulateUpload}
                    disabled={!!cvFilename}
                  >
                    {cvFilename ? 'CV Uploaded' : 'Upload CV'}
                  </Button>
                  {cvFilename && (
                    <Box>
                      <Chip
                        label={cvFilename}
                        color="success"
                        onDelete={() => setCvFilename('')}
                      />
                    </Box>
                  )}
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  * This is a demo - no actual file upload occurs
                </Typography>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 4 }}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ApplicationForm;


