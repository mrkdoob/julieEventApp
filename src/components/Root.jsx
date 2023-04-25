import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { Footer } from "./Footer";

// WIL HIER GRAAG USEROUTELOADERDATA VOOR GEBRUIKEN
// export const loader = async () => {
//   const events = await fetch(`http://localhost:3000/events`);
//   const categories = await fetch("http://localhost:3000/categories");
//   const users = await fetch("http://localhost:3000/users");

//   return {
//     events: await events.json(),
//     categories: await categories.json(),
//     users: await users.json(),
//   };
// };

export const Root = () => {
  return (
    <Box>
      <Navigation />
      <Outlet />
      <Footer />
    </Box>
  );
};
