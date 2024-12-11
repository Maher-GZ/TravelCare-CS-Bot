import React from "react";
import { Box as ChakraBox, Button, Input, Text } from "@chakra-ui/react";

const CustomBox = () => {
  return (
    <ChakraBox
      bg="green.600"
      p={8}
      borderRadius="md"
      color="white"
      w="500px"
      mx="auto"
      mt="20"
      textAlign="center"
    >
      <Text fontSize="lg" mb={6}>
        Enter you ID
      </Text>
      <Input placeholder="Enter passenger ID" type="text" mb={6} />
      <Button type="submit" colorScheme="teal">
        Submit
      </Button>
    </ChakraBox>
  );
};

export default CustomBox;
