'use client'
import { Box, Stack, TextField, CircularProgress, IconButton } from '@mui/material'
import { useState, useRef, useEffect } from 'react'
import { ArrowUpward } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import Navbar from '../components/Navbar';
import IntroMessage from '../components/intromessage';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm the Rate My Professor support assistant. How can I help you today?`,
    },
  ]);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a message
  const sendMessage = async () => {
    if (introVisible) {
      setIntroVisible(false);
    }

    const userMessage = message.trim();
    if (userMessage === '') return;

    setMessage('');
    setIsLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: userMessage },
      { role: 'assistant', content: '' },
    ]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: userMessage }]),
      });

      if (!response.body) {
        throw new Error("Response body is null");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      const processText = async ({ done, value }) => {
        if (done) {
          setIsLoading(false);
          return;
        }
        const text = decoder.decode(value || new Uint8Array(), { stream: true });
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          const otherMessages = prevMessages.slice(0, prevMessages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
        return reader.read().then(processText);
      };

      await reader.read().then(processText);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  // Handle the Enter key press to send the message
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box
      bgcolor="#0d0d30"
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      color="#fff"
      justifyContent="space-between"
      alignItems="center"
    >
      <Navbar />

      <IntroMessage introVisible={introVisible} />

      <Stack
        direction="column"
        width="100%"
        maxWidth="600px"
        height="90%"
        borderRadius={2}
        bgcolor="rgba(255, 255, 255, 0.5)"
        py={2}
        px={1}
        spacing={3}
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
          fontSize={14}
          paddingX={2}
          sx={{
            overflowX: "hidden",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#edebed",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#1e3557",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#162842",
            },
          }}
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
                bgcolor={message.role === "assistant" ? "#1e3557" : "white"}
                color={message.role === "assistant" ? "white" : "black"}
                borderRadius={5}
                boxShadow={5}
                p={2}
                maxWidth="80%"
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          borderRadius={10}
          boxShadow={3}
          sx={{
            maxWidth: "600px",
            width: "100%",
            maxHeight: "60px",
            bgcolor: "white",
          }}
        >
          <TextField
            placeholder="Ask Rate My Professor Bot anything.."
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px",
                bgcolor: "white",
                fontFamily: "'Nunito', sans-serif",
                fontSize: "14px",
                boxShadow: "none",
                "& fieldset": {
                  border: "none",
                },
              },
              "& .MuiInputBase-input": {
                padding: "13px 20px",
              },
            }}
          />
          <IconButton
            onClick={sendMessage}
            disabled={isLoading || !message.trim()}
            sx={{
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              color: "black",
              "&:hover": {
                bgcolor: "#e5ece9",
              },
            }}
          >
            {isLoading ? <CircularProgress size={24} /> : <ArrowUpward />}
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
}
