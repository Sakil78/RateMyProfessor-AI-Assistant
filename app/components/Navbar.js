import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from 'react';

const Navbar = () => {
  const router = useRouter();

  const goToLandingPage = () => {
    router.push('/');
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}
    sx={{ boxShadow: "none", paddingTop: "10px" }}>
      <Toolbar sx={{ justifyContent: "space-between", paddingX: "5px"}}>
        <Box display="flex" alignItems="center">
        <Button onClick={goToLandingPage} sx={{ textTransform: "none", padding: 0 }}>
          <Typography variant="h6" noWrap component="div" sx={{color: '#fff', fontWeight: 'bold', fontFamily: "'Nunito', sans-serif" }}>
            Rate My Professor
          </Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
