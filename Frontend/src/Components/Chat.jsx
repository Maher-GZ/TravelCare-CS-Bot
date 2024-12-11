import React, { useState, useRef, useEffect } from "react";
import ChatBooble from "./ChatBooble";
import {
  Flex,
  Stack,
  IconButton,
  Input,
  VStack,
  Text,
  Box,
} from "@chakra-ui/react";
import { IoSend } from "react-icons/io5";

const Chat = () => {
  const myDate = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const [inputMessage, setInputMessage] = useState("");
  const [combinedMessage, setCombinedMessage] = useState([
    {
      message: "Hello, How can I assist you today?",
      from: "Chatbot",
      dateSent: myDate(),
    },
  ]);
  const [loading, setLoading] = useState(false); // For loading spinner
  const [error, setError] = useState(""); // For error messages

  const chatContainerRef = useRef(null);



  
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [combinedMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputMessage.trim() === "") return;

    setCombinedMessage((prevMessage) => [
      ...prevMessage,
      {
        message: inputMessage,
        from: "me",
        dateSent: myDate(),
      },
    ]);

    setInputMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/process_message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!res.ok) {
        throw new Error("Failed to communicate with the server.");
      }

      const data = await res.json();
      setCombinedMessage((prevMessage) => [
        ...prevMessage,
        {
          message: data.result || "Sorry, I didn't get that.",
          from: "Chatbot",
          dateSent: myDate(),
        },
      ]);
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box position="relative">
      
      <Flex
        bgColor={"blue.900"}
        border={"gray 2px double"}
        borderRadius={8}
        width="65vw"
        height="80vh"
        direction="column"
        mt={5}
      >
        <VStack width={"100%"} height="100%">
          <Stack
            width={"100%"}
            height={"90%"}
            overflowY={"auto"}
            sx={{
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
            p={4}
            ref={chatContainerRef}
          >
            <VStack>
              {combinedMessage.map(({ message, from, dateSent }, index) => (
                <ChatBooble
                  key={index}
                  message={message}
                  from={from}
                  dateSent={dateSent}
                />
              ))}
              {loading && (
                <Text color="white" alignSelf="flex-start" mt={2}>
                  Processing...
                </Text>
              )}
            </VStack>
          </Stack>
          <Flex
            pl={3}
            pr={3}
            py={2}
            borderTopColor={"gray.100"}
            borderTopWidth={1}
            width={"100%"}
            align="center"
          >
            <Input
              variant="unstyled"
              placeholder="Type your message"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
            />
            <IconButton
              colorScheme="blue"
              aria-label="Send message"
              icon={<IoSend />}
              onClick={handleSubmit}
              isDisabled={loading}
            />
          </Flex>
          {error && (
            <Text color="red.400" mt={2} alignSelf="flex-start" px={4}>
              {error}
            </Text>
          )}
        </VStack>
      </Flex>
    </Box>
  );
};

export default Chat;
