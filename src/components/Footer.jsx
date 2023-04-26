import React from "react";
import { Box, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box
      bgGradient="linear(to-b, black, yellow.300 )"
      pt={40}
      pb={5}
      width="100%"
    >
      <Text
        bg="blackAlpha.800"
        display="flex"
        justifyContent="center"
        fontSize="1xl"
        color="white"
        pt={7}
        pb={7}
        pr={10}
      >
        Final assignment Winc FED Julie Salden 2023
      </Text>
    </Box>
  );
};
