import React from "react";
import { Link } from "react-router-dom";
import { Box, Text, Center } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Center>
      <Box
        bgGradient="linear(to-b, yellow.300, black )"
        pt={5}
        pb={40}
        width="100%"
      >
        <Link to="/">
          <Text
            bg="blackAlpha.800"
            display="flex"
            justifyContent="flex-end"
            fontSize="xl"
            color="white"
            pt={7}
            pb={7}
            pr={10}
          >
            Your Music Event App
          </Text>
        </Link>
      </Box>
    </Center>
  );
};
