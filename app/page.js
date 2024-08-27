<<<<<<< HEAD
'use client';
import * as React from 'react';
import { Box, Button, Stack, TextField, Paper, Typography, IconButton, Toolbar, AppBar } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import AssistantIcon from '@mui/icons-material/Assistant';

=======
"use client";
import { Box, Button, Typography, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
>>>>>>> upstream/main

export default function LandingPage() {
  const router = useRouter();

  const navigateToMain = () => {
    router.push("/chat");
  };

  return (
<<<<<<< HEAD
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg%20id='patternId'%20width='100%25'%20height='100%25'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern%20id='a'%20patternUnits='userSpaceOnUse'%20width='20'%20height='20'%20patternTransform='scale(2)%20rotate(0)'%3E%3Crect%20x='0'%20y='0'%20width='100%25'%20height='100%25'%20fill='hsla(228,%2090%25,%208%25,%201)'/%3E%3Cpath%20d='M10-6V6M10%2014v12M26%2010H14M6%2010H-6'%20stroke-linecap='square'%20stroke-width='1'%20stroke='hsla(258.5,59.4%25,59.4%25,1)'%20fill='none'/%3E%3C/pattern%3E%3C/defs%3E%3Crect%20width='800%25'%20height='800%25'%20transform='translate(0,0)'%20fill='url(%23a)'/%3E%3C/svg%3E")`,
          backgroundColor: "#01061a",
      }}
    >



      <AppBar position="static" sx={{ backgroundColor: '#01061a', color: '#805AD5' }}>
        <Toolbar>
          <IconButton size="large" edge="start" aria-label="menu">
            <AssistantIcon sx={{ color: '#805AD5' }} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, letterSpacing: 2, color: '#805AD5' }}>
            Rate My Professor
          </Typography>
        </Toolbar>
      </AppBar>


      <Stack
        direction="column"
        width="70vw"
        height="700px"
        p="15px 20px"
        spacing={3}
        sx={{
          mx: "auto",
          borderRadius: "16px",
          backgroundColor: '#01061a',
        }}
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === "assistant" ? "flex-start" : "flex-end"
              }
            >
              <Box
                bgcolor={
                  message.role === "assistant"
                    ? "#805AD5"
                    : "primary.main"
                }
                color="white"
                borderRadius={16}
                p={3}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Stack direction="row" spacing={2}>
        <TextField
          label="Message"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          sx={{
            borderRadius: "16px",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#01061a", 
              color: "#f5f5f7", // Light text color
              "& fieldset": {
                borderColor: "#805AD5", // Border color
              },
              "&:hover fieldset": {
                borderColor: "#9f7aea", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#c4b5fd", // Border color when focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "#f5f5f7", // Light label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#c4b5fd", // Label color when focused
            },
          }}
        />

          <Button
            variant="contained"
            onClick={sendMessage}
            disabled={loading}
            aria-label="Send message"
            sx={{backgroundColor: "#805AD5"}}
          >
            Send
          </Button>
        </Stack>
      </Stack>
=======
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
>>>>>>> upstream/main
    </Box>
    </>
  );
}
