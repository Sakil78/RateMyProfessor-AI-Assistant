"use client";
import { Box, Button, Typography, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();

  const navigateToMain = () => {
    router.push("/chat");
  };

  return (
    <>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        bgcolor="#f5f5f5"
      >
        <Navbar />
        <Stack
          direction="row"
          flexGrow={1}
          justifyContent="center"
          alignItems="center"
          padding={4}
          spacing={4}
        >
          {/* Left Side */}
          <Stack direction="column" spacing={2} alignItems="flex-start">
          <Typography
            variant="h2"
            sx={{
              color: "#1e3557",
              fontWeight: "bold",
              fontFamily: "'Nunito', sans-serif" }}
          >
            Welcome to Rate My
          </Typography>
          <Typography
              variant="h2"
              sx={{
                color: "#1e3557",
                fontWeight: "bold",
                fontFamily: "'Nunito', sans-serif"
              }}
            >
              Professor Assistant!
            </Typography>
          <Typography
            variant="h6"
            sx={{ color: "#1e3557", fontFamily: "'Nunito', sans-serif" }}
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
              bgcolor: "#1e3557",
              color: "white",
              "&:hover": {
                bgcolor: "#162842",
              },
            }}
          >
            Ask Our AI →
          </Button>
        </Stack>

          {/* Right Side */}
          <Box
            sx={{
              width: "50%",
              height: "auto",
              display: { xs: "none", md: "block" },
            }}
          >
            <Image
              src="/1.jpg"
              alt="Rate My Professor AI"
              width={380}
              height={280}
          style={{
            borderRadius: '8px',
            maxWidth: '100%',
            height: 'auto',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          }}
            />
          </Box>
        </Stack>
      </Box>
    </>
  );
}
