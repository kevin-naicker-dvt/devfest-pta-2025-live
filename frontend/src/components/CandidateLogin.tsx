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
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { CandidateProfile } from '../types';

interface CandidateLoginProps {
  onLogin: (profile: CandidateProfile) => void;
}

const CandidateLogin: React.FC<CandidateLoginProps> = ({ onLogin }) => {
  const [candidateName, setCandidateName] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!candidateName || !email || !fullName) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    onLogin({ candidateName, email, fullName });
  };

  const handleQuickLogin = (profile: CandidateProfile) => {
    setCandidateName(profile.candidateName);
    setEmail(profile.email);
    setFullName(profile.fullName);
    onLogin(profile);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Card sx={{ boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <PersonIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" component="h1" gutterBottom>
                Candidate Login
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter your details to continue
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Candidate Name (Username)"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                margin="normal"
                required
                helperText="This will be displayed in the system"
              />

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                helperText="We'll use this to track your applications"
              />

              <TextField
                fullWidth
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                margin="normal"
                required
                helperText="Your complete legal name"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2 }}
              >
                Continue
              </Button>
            </form>

            <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                Quick Login (Demo):
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() =>
                    handleQuickLogin({
                      candidateName: 'sarah_chen',
                      email: 'sarah.chen@example.com',
                      fullName: 'Sarah Chen',
                    })
                  }
                >
                  Sarah Chen
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() =>
                    handleQuickLogin({
                      candidateName: 'michael_jones',
                      email: 'michael.jones@example.com',
                      fullName: 'Michael Jones',
                    })
                  }
                >
                  Michael Jones
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() =>
                    handleQuickLogin({
                      candidateName: 'priya_patel',
                      email: 'priya.patel@example.com',
                      fullName: 'Priya Patel',
                    })
                  }
                >
                  Priya Patel
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default CandidateLogin;


