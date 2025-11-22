import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';
import axios from 'axios';

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

interface HelloWorldData {
  id: number;
  message: string;
  created_at: string;
}

function App() {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  useEffect(() => {
    const fetchHelloWorld = async () => {
      try {
        setLoading(true);
        const response = await axios.get<HelloWorldData>(`${API_URL}/api/hello`);
        setMessage(response.data.message);
        setError('');
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to connect to the backend. Make sure the API is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchHelloWorld();
  }, [API_URL]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            py: 4,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            DevFest PTA 2025
          </Typography>
          
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ color: 'text.secondary', mb: 4 }}
          >
            Google Cloud Platform Demo
          </Typography>

          <Card sx={{ minWidth: 400, boxShadow: 3 }}>
            <CardContent>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" component="div" sx={{ mb: 2 }}>
                    {message}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Message retrieved from PostgreSQL database
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>

          <Typography
            variant="caption"
            sx={{ mt: 4, color: 'text.secondary' }}
          >
            3-Tier Architecture: React + NestJS + PostgreSQL
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;

