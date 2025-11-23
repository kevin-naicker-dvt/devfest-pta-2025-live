import React, { useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
} from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import RoleSelection from './components/RoleSelection';
import CandidateLogin from './components/CandidateLogin';
import ApplicationForm from './components/ApplicationForm';
import MyApplications from './components/MyApplications';
import ApplicationQueue from './components/ApplicationQueue';
import { CandidateProfile, UserRole } from './types';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [role, setRole] = useState<UserRole | null>(() => {
    const saved = localStorage.getItem('userRole');
    return saved as UserRole | null;
  });

  const [candidate, setCandidate] = useState<CandidateProfile | null>(() => {
    const saved = localStorage.getItem('candidate');
    return saved ? JSON.parse(saved) : null;
  });

  const handleSelectRole = (selectedRole: UserRole) => {
    setRole(selectedRole);
    localStorage.setItem('userRole', selectedRole);
  };

  const handleCandidateLogin = (profile: CandidateProfile) => {
    setCandidate(profile);
    localStorage.setItem('candidate', JSON.stringify(profile));
  };

  const handleLogout = () => {
    setRole(null);
    setCandidate(null);
    localStorage.removeItem('userRole');
    localStorage.removeItem('candidate');
  };

  // No role selected - show role selection
  if (!role) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RoleSelection onSelectRole={handleSelectRole} />
      </ThemeProvider>
    );
  }

  // Candidate role but not logged in
  if (role === 'candidate' && !candidate) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CandidateLogin onLogin={handleCandidateLogin} />
      </ThemeProvider>
    );
  }

  // Candidate role and logged in
  if (role === 'candidate' && candidate) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
            <Navigation
              role="candidate"
              candidateName={candidate.candidateName}
              onLogout={handleLogout}
            />
            <Routes>
              <Route path="/" element={<Navigate to="/apply" replace />} />
              <Route path="/apply" element={<ApplicationForm candidate={candidate} />} />
              <Route path="/my-applications" element={<MyApplications candidate={candidate} />} />
              <Route path="*" element={<Navigate to="/apply" replace />} />
            </Routes>
          </Box>
        </Router>
      </ThemeProvider>
    );
  }

  // Recruiter role
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
          <Navigation role="recruiter" onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Navigate to="/queue" replace />} />
            <Route path="/queue" element={<ApplicationQueue />} />
            <Route path="*" element={<Navigate to="/queue" replace />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;

