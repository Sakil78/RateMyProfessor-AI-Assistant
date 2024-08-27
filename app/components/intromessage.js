import React from 'react';
import { Box, Typography, Collapse } from '@mui/material';

const IntroMessage = ({ introVisible }) => {
  return (
    <Collapse in={introVisible} timeout={600}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        flexGrow={1}
        maxWidth="520px"
        width="100%"
        textAlign="center"
        sx={{
          marginBottom: 10,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            marginTop: 3,
            marginBottom: 1,
            fontFamily: "'Nunito', sans-serif",
            lineHeight: "40px",
          }}
        >
          Hi there!
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: 0.5,
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          Can I help you with anything?
        </Typography>
        <Typography
          sx={{
            marginBottom: 1,
            fontFamily: "'Nunito', sans-serif",
            fontSize: "14px",
            color: "#dbc8fb",
          }}
        >
          I am here to guide you in choosing the best professor.
          Shall we begin?
        </Typography>
      </Box>
    </Collapse>
  );
};

export default IntroMessage;
