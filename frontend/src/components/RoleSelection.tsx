import React from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import { UserRole } from '../types';

interface RoleSelectionProps {
  onSelectRole: (role: UserRole) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            DevFest PTA 2025
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Recruitment Application
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            Please select your role to continue
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                boxShadow: 3,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <PersonIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Job Candidate
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Submit job applications and track your application status
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => onSelectRole('candidate')}
                >
                  Continue as Candidate
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                boxShadow: 3,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <WorkIcon sx={{ fontSize: 80, color: 'secondary.main', mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Recruiter
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Review applications, update status, and manage candidates
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  color="secondary"
                  sx={{ mt: 2 }}
                  onClick={() => onSelectRole('recruiter')}
                >
                  Continue as Recruiter
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default RoleSelection;


