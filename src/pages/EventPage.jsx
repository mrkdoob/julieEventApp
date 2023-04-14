import React from "react";
import { useLoaderData } from "react-router-dom";
import { Heading, Box, Text, Image } from "@chakra-ui/react";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const users = await fetch("http://localhost:3000/users");
  return {
    event: await event.json(),
    users: await users.json(),
  };
};

export const EventPage = () => {
  const { event, users } = useLoaderData();

  return (
    <>
      <Heading>Event</Heading>
      <Box>
        <Text>{event.title}</Text>
        <Text>{event.description}</Text>
        <Image src={event.image} alt={event.title}></Image>
        <Text>
          Start time event: {new Date(event.startTime).toLocaleString()}
        </Text>
        <Text>End time event: {new Date(event.endTime).toLocaleString()}</Text>
        <Text>Created by:</Text>{" "}
      </Box>
      {users.map((user) =>
        user.id === event.createdBy ? (
          <Box key={user.id}>
            <Text>{user.name}</Text>
            <Image src={user.image}></Image>
          </Box>
        ) : null
      )}
    </>
  );
};
