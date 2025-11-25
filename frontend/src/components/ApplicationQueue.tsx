import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { applicationsApi } from '../api/applicationsApi';
import { Application } from '../types';
import ApplicationEditDialog from './ApplicationEditDialog';

const STATUS_COLORS: { [key: string]: 'default' | 'warning' | 'success' | 'error' | 'info' } = {
  pending: 'warning',
  reviewing: 'info',
  interviewed: 'info',
  accepted: 'success',
  rejected: 'error',
};

const ApplicationQueue: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await applicationsApi.getAll();
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
    // Poll for updates every 5 seconds
    const interval = setInterval(fetchApplications, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleEditClick = (application: Application) => {
    setSelectedApplication(application);
    setEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setEditDialogOpen(false);
    setSelectedApplication(null);
  };

  const handleSave = async () => {
    await fetchApplications();
    handleCloseDialog();
  };

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
      <Container maxWidth="xl">
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
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Application Queue
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage and review job applications
            </Typography>
          </Box>
          <Chip
            label={`${applications.length} Application${applications.length !== 1 ? 's' : ''}`}
            color="primary"
            sx={{ fontSize: '1rem', py: 2 }}
          />
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.100' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Candidate</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Position</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Applied</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>CV</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No applications yet
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                applications.map((app) => (
                  <TableRow
                    key={app.id}
                    hover
                    sx={{
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    <TableCell>#{app.id}</TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {app.fullName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          @{app.candidateName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{app.email}</TableCell>
                    <TableCell>{app.position}</TableCell>
                    <TableCell>
                      <Chip
                        label={app.status.toUpperCase()}
                        color={STATUS_COLORS[app.status] || 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{formatDate(app.createdAt)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" color="text.secondary">
                        {app.cvFilename || 'N/A'}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleEditClick(app)}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {selectedApplication && (
        <ApplicationEditDialog
          open={editDialogOpen}
          application={selectedApplication}
          onClose={handleCloseDialog}
          onSave={handleSave}
        />
      )}
    </Container>
  );
};

export default ApplicationQueue;



