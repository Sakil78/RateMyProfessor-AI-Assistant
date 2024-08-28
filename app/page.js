'use client';
import * as React from 'react';
import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';  // Correct import for App Router
import Navbar from './components/Navbar';

export default function LandingPage() {


  const router = useRouter();

  const navigateToMain = () => {
    router.push("/chat");
  };

  return (
    <>
    <Box sx={{
      position: 'relative',
      minHeight: '100vh',
      overflow: 'hidden',
    }}>
        <Navbar />
      {/* Background Image with Blur */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("/starry-sky.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // filter: 'blur(2px)',  
        zIndex: -1,  
      }} />
      <Box sx={{
        position: 'relative',
        zIndex: 1, 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        padding: 4,
      }}>

        <Box sx={{
          flex: '1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
        }}>
          <Grid container spacing={4} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                component="h1" 
                fontWeight="bold" 
                gutterBottom
                sx={{ 
                  fontFamily: 'Oswald, sans-serif',
                  textTransform: 'uppercase',  
                  fontSize: '3rem',  
                  fontWeight: '700', 
                  letterSpacing: '1px'
                }}
              >
                Welcome to Rate My Professor AI Assistant!
              </Typography>
              <Typography 
                variant="h6" 
                paragraph
                sx={{
                  color: '#b0b3c1'  //#dbc8fb
                }}
              >
                Find the Best Professors in Seconds with AI Insights!
              </Typography>
              <Button
                variant="contained"
                onClick={navigateToMain}
                sx={{
                  padding: "10px 20px",
                  borderRadius: "25px",
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "16px",
                  bgcolor: "#5865f2", //#1e3557
                  color: '#fff', //white
                  "&:hover": {
                    bgcolor: "#162842",
                  },
                  mt: 2,  // Add margin-top for spacing
                }}
              >
                Ask Our AI →
              </Button>
            </Grid>

            {/* Right Side */}
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <img
                  src="/h1.png"
                  alt="Rate My Professor AI"
                  style={{
                    width: '90%',
                    height: '90%', 
                    maxWidth: '100%',
                    maxHeight: '100%',
                    filter: "drop-shadow(-30px 40px 6px rgba(0,0,0,0.5))"
                  }} 
                />
              </Box>
            </Grid>
          </Grid>
        </Box>  
      </Box>
      </Box>
    </>
  );
}
