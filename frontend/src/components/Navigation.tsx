import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Chip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import { UserRole } from '../types';

interface NavigationProps {
  role: UserRole;
  candidateName?: string;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ role, candidateName, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static" color={role === 'recruiter' ? 'secondary' : 'primary'}>
      <Toolbar>
        <WorkIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          DevFest PTA 2025 - Recruitment
        </Typography>

        {role === 'candidate' && candidateName && (
          <>
            <Button
              color="inherit"
              onClick={() => navigate('/apply')}
              sx={{
                mx: 1,
                backgroundColor:
                  location.pathname === '/apply' ? 'rgba(255,255,255,0.1)' : 'transparent',
              }}
            >
              Apply for Job
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate('/my-applications')}
              sx={{
                mx: 1,
                backgroundColor:
                  location.pathname === '/my-applications'
                    ? 'rgba(255,255,255,0.1)'
                    : 'transparent',
              }}
            >
              My Applications
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <PersonIcon sx={{ mr: 1 }} />
              <Chip
                label={candidateName}
                color="primary"
                variant="outlined"
                sx={{ mr: 2, borderColor: 'white', color: 'white' }}
              />
              <Button color="inherit" onClick={onLogout} variant="outlined">
                Logout
              </Button>
            </Box>
          </>
        )}

        {role === 'recruiter' && (
          <>
            <Button
              color="inherit"
              onClick={() => navigate('/queue')}
              sx={{
                mx: 1,
                backgroundColor:
                  location.pathname === '/queue' ? 'rgba(255,255,255,0.1)' : 'transparent',
              }}
            >
              Application Queue
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <BusinessIcon sx={{ mr: 1 }} />
              <Chip
                label="Recruiter"
                color="secondary"
                variant="outlined"
                sx={{ mr: 2, borderColor: 'white', color: 'white' }}
              />
              <Button color="inherit" onClick={onLogout} variant="outlined">
                Switch Role
              </Button>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;

