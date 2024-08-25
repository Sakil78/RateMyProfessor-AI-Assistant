import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import React from 'react';

const Navbar = () => {

  const goToHomePage = () => {
    router.push('/');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "white", boxShadow: "none", paddingTop: "10px" }}>
      <Toolbar sx={{ justifyContent: "space-between", paddingX: "5px"}}>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component="div" sx={{ color: "#1e3557", fontWeight: 'bold', fontFamily: "'Nunito', sans-serif" }}>
            Rate My Professor
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
