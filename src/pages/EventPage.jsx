import React from "react";
import { useLoaderData } from "react-router-dom";
import { Heading, Box, Text, Image } from "@chakra-ui/react";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/event/${params.eventId}`);
  return {
    event: await event.json(),
  };
};

export const EventPage = () => {
  const { event } = useLoaderData();

  return (
    <>
      <Heading>Event</Heading>
      <Box key={event.id}>
        <Text>{event.title}</Text>
        <Text>{event.description}</Text>
        <Image src={event.image} alt={event.title}></Image>
        <Text>
          Start time event: {new Date(event.startTime).toLocaleString()}
        </Text>
        <Text>End time event: {new Date(event.endTime).toLocaleString()}</Text>
        <Text>{event.categoryIds}</Text>
      </Box>
    </>
  );
};
