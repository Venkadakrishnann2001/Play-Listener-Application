import React, { useEffect } from "react";
import { Box, Center, Image, Text } from "@chakra-ui/react";
import Navbar from "../Upgrade/UpgradeComponents/Navbar";
import axios from "axios";

export const PaymentSuccess = () => {
  const order = Math.random();

  useEffect(() => {
    // Send the message to the backend when the component mounts
    const sendMessage = async () => {
      try {
        // Message content
        const messageContent = `Your payment is complete. A receipt for order #${order} will be sent to your email.`;

        // Send POST request to the backend
        await axios.post("/api/messages", { content: messageContent });

        console.log("Message sent successfully!");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    };

    sendMessage();
  }, [order]);

  return (
    <Box>
      <Navbar />
      <Image
        src="https://cdn.dribbble.com/users/1751799/screenshots/5512482/check02.gif"
        mx="auto"
      />
      <Center mt="-60px">
        <Text color="#00d34f" fontSize="56px" fontWeight="bold">
          You're Premium now.
        </Text>
      </Center>
      <Center>
        <Text fontWeight="semibold">
          Your payment is complete. A receipt for order #{order} will be sent to
          your email
        </Text>
      </Center>
    </Box>
  );
};
