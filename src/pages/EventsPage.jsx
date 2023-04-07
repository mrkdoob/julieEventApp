import React from "react";
import { Heading, Box, Text, Image, Button } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  return { events: await events.json(), categories: await categories.json() };
};

export const EventsPage = () => {
  const { events } = useLoaderData();

  return (
    <>
      <Heading>List of events</Heading>;
      {events.map((event) => {
        return (
          <Box key={event.id}>
            <Link to={`events/${event.id}`}>
              <Text>{event.title}</Text>
              <Text>{event.description}</Text>
              <Image src={event.image} alt={event.title}></Image>
              <Text>
                Start time event: {new Date(event.startTime).toLocaleString()}
              </Text>
              <Text>
                End time event: {new Date(event.endTime).toLocaleString()}
              </Text>
              <Text>{event.categoryIds}</Text>
            </Link>
          </Box>
        );
      })}
      <Button>Add event</Button>
    </>
  );
};
