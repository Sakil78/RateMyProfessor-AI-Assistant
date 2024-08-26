'use client';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';

export default function LandingPage() {
  const router = useRouter();

  const navigateToMain = () => {
    router.push('/chat');
  };

  return (
    <>
    <Navbar />
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f5f5f5"
    >
      <Typography
        variant="h2"
        sx={{ color: "#1e3557", fontWeight: 'bold', fontFamily: "'Nunito', sans-serif", mb: 4 }}
      >
        Welcome to Rate My Professor Assistant!
      </Typography>
      <Typography
        variant="h5"
        sx={{ color: "#1e3557", fontWeight: 'bold', fontFamily: "'Nunito', sans-serif", mb: 4 }}
      >
        Get personalized support and information!
      </Typography>
      <Button 
        variant="contained" 
        onClick={navigateToMain} 
        sx={{ 
          padding: '10px 20px',
          borderRadius: '25px',
          fontFamily: "'Nunito', sans-serif",
          fontSize: '16px',
          bgcolor: '#1e3557',
          color: 'white',
          '&:hover': {
            bgcolor: '#162842',
          },
        }}
      >
        Get Started
      </Button>
    </Box>
    </>
  );
}
