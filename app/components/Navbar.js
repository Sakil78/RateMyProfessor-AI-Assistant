import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from 'react';

const Navbar = () => {
  const router = useRouter();

  const goToLandingPage = () => {
    router.push('/');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "white", boxShadow: "none", paddingTop: "10px" }}>
      <Toolbar sx={{ justifyContent: "space-between", paddingX: "5px"}}>
        <Box display="flex" alignItems="center">
        <Button onClick={goToLandingPage} sx={{ textTransform: "none", padding: 0 }}>
          <Typography variant="h6" component="div" sx={{ color: "#1e3557", fontWeight: 'bold', fontFamily: "'Nunito', sans-serif" }}>
            Rate My Professor
          </Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
