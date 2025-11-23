import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Alert,
  CircularProgress,
  Grid,
  Paper,
  Divider,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { applicationsApi } from '../api/applicationsApi';
import { Application, CandidateProfile } from '../types';

interface MyApplicationsProps {
  candidate: CandidateProfile;
}

const STATUS_COLORS: { [key: string]: 'default' | 'warning' | 'success' | 'error' | 'info' } = {
  pending: 'warning',
  reviewing: 'info',
  interviewed: 'info',
  accepted: 'success',
  rejected: 'error',
};

const MyApplications: React.FC<MyApplicationsProps> = ({ candidate }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await applicationsApi.getByEmail(candidate.email);
      setApplications(data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    // Poll for updates every 5 seconds to see recruiter changes
    const interval = setInterval(fetchApplications, 5000);
    return () => clearInterval(interval);
  }, [candidate.email]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading && applications.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            minHeight: '50vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Applications
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Track the status of your job applications
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {applications.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <DescriptionIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No applications yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Submit an application to get started!
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {applications.map((app) => (
              <Grid item xs={12} key={app.id}>
                <Card sx={{ boxShadow: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" component="h2">
                          {app.position}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 1, alignItems: 'center' }}>
                          <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            Applied: {formatDate(app.createdAt)}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        label={app.status.toUpperCase()}
                        color={STATUS_COLORS[app.status] || 'default'}
                        sx={{ height: 32 }}
                      />
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Application ID
                        </Typography>
                        <Typography variant="body1">#{app.id}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          CV File
                        </Typography>
                        <Typography variant="body1">{app.cvFilename || 'N/A'}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Last Updated
                        </Typography>
                        <Typography variant="body1">{formatDate(app.updatedAt)}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Status
                        </Typography>
                        <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                          {app.status}
                        </Typography>
                      </Grid>
                    </Grid>

                    {app.notes && (
                      <Box sx={{ mt: 2 }}>
                        <Paper elevation={0} sx={{ p: 2, bgcolor: 'info.lighter' }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Recruiter Notes:
                          </Typography>
                          <Typography variant="body1">{app.notes}</Typography>
                        </Paper>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default MyApplications;


