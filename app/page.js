"use client";
import { Box, Button, Typography, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";

export default function LandingPage() {
  const router = useRouter();

  const navigateToMain = () => {
    router.push("/chat");
  };

  return (
    <>
      <Box sx={{
      backgroundColor: '#0d0d30',
      backgroundImage: 'url("/starry-sky.png")',  // Starry night sky background image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      color: '#fff',
    }}>
        <Navbar />
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
                textTransform: 'uppercase',  // All-caps for the headline
                fontSize: '3rem',  // Adjust font size
                fontWeight: '1000', // Adjust font weight
                letterSpacing: '2px' // Letter spacing for impact
              }}
            >
            Welcome to Rate
            </Typography>
            <Typography 
              variant="h2" 
              component="h1" 
              fontWeight="bold" 
              gutterBottom
              sx={{ 
                textTransform: 'uppercase',  // All-caps for the headline
                fontSize: '3rem',  // Adjust font size
                fontWeight: '1000', // Adjust font weight
                letterSpacing: '2px' // Letter spacing for impact
              }}
            >
            My Professor
            </Typography>
            <Typography 
              variant="h2" 
              component="h1" 
              fontWeight="bold" 
              gutterBottom
              sx={{ 
                textTransform: 'uppercase',  // All-caps for the headline
                fontSize: '3rem',  // Adjust font size
                fontWeight: '1000', // Adjust font weight
                letterSpacing: '2px' // Letter spacing for impact
              }}
            >
            Assistant!
            </Typography>
            <Typography 
              variant="h6" 
              paragraph
              sx={{
                color: '#b0b3c1'  // Slightly lighter text color for paragraph
              }}
            >
            Get personalized support and information!
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
              src="/1.jpg"
              alt="Rate My Professor AI"
              style={{
                width: '100%',
                height: 'auto', 
                maxWidth: '100%',
                maxHeight: '100%',
                borderRadius: '8px',
                boxShadow: '0px 0px 15px rgba(255, 255, 255, 0.5)'  // Subtle glow effect
              }} 
            />
          </Box>
          </Grid>
        </Grid>
      </Box>  
    </Box>
    </>
  );
}
