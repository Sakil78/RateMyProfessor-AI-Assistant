"use client";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello, I am Rate My Professor Support Assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const messagesEndRef = useRef(null);

  const sanitizeMessage = (msg) => {
    // Optional: Refine this function based on specific needs
    return msg.trim().replace(/\b(\w+)\s+\1\b/g, '$1').trim();
  };

  const sendMessage = async () => {
    if (message.trim() === "") return; // Prevent sending empty messages

    const now = Date.now();
    if (now - lastMessageTime < 1000) { // 1 second cooldown
      return;
    }
    setLastMessageTime(now);

    setLoading(true);
    const sanitizedMessage = sanitizeMessage(message);
    setMessage("");
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: sanitizedMessage },
      { role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: sanitizedMessage }]),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let buffer = "";
      let done = false;
      
      while (!done) {
        const { done: isDone, value } = await reader.read();
        done = isDone;
        const text = decoder.decode(value || new Uint8Array(), { stream: true });
        buffer += text;

        if (buffer.length > 100 || done) { // Adjust buffer size as needed
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            const lastMessage = updatedMessages[updatedMessages.length - 1];
            lastMessage.content += buffer;
            return updatedMessages;
          });
          buffer = "";
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: `Error: ${error.message}. Please try again.`,
        },
      ]);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !loading) {
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h4" gutterBottom>
        Search For Professor of Your Type
      </Typography>

      <Stack
        direction="column"
        width="70vw"
        height="700px"
        border="2px solid lightblue"
        p='15px 20px'
        spacing={3}
        sx={{
          mx: "auto",
          borderRadius: "16px",
        }}
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={msg.role === "assistant" ? "flex-start" : "flex-end"}
            >
              <Box
                bgcolor={msg.role === "assistant" ? "primary.main" : "secondary.main"}
                color="white"
                borderRadius='25px'
                p={3}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
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
            sx={{ borderRadius: "16px" }} // Make the TextField rounded
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            disabled={loading}
            aria-label="Send message"
          >
            {loading ? "Sending..." : "Send"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
