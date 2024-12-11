import React, { useState } from "react";
import { Box as ChakraBox, Button, Input, Text } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import Chat from "./Chat.jsx";

const CustomBox = ({ onSubmit }) => {
  const [passengerId, setPassengerId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (passengerId.trim() === "") {
      setError("Passenger ID cannot be empty");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/check_id?id=${passengerId}`
      );
      const data = await response.json();

      if (response.ok && data.status === "exist") {
        setError(""); // Clear error message
        onSubmit(); // Show Chat component
      } else {
        setError("Passenger ID does not exist");
      }
    } catch (error) {
      console.error("Error checking ID:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <ChakraBox
      bg="green.900"
      p={8}
      borderRadius="md"
      color="white"
      w="500px"
      mx="auto"
      mt="20"
      textAlign="center"
    >
      <Text fontSize="lg" mb={6}>
        Please enter your passenger ID
      </Text>
      <Input
        placeholder="Enter passenger ID"
        type="text"
        value={passengerId}
        onChange={(e) => setPassengerId(e.target.value)}
        mb={6}
      />
      {error && (
        <Text color="red.500" mb={4}>
          {error}
        </Text>
      )}
      <Button type="submit" colorScheme="teal" onClick={handleSubmit}>
        Submit
      </Button>
    </ChakraBox>
  );
};

const Home = () => {
  const [showChat, setShowChat] = useState(false);

  const handlePassengerIdSubmit = () => {
    setShowChat(true); // Show Chat component when passenger ID exists
  };

  return (
    <Container
      bg={"white"}
      maxW="container.xl"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {!showChat ? <CustomBox onSubmit={handlePassengerIdSubmit} /> : <Chat />}
    </Container>
  );
};

export default Home;
