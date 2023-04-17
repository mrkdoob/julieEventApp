import React from "react";
import { Heading, Box, Text, Image, Button } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { Searchbar } from "../components/Searchbar";
// import { Categorypicker } from "../components/Categorypicker";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  return { events: await events.json(), categories: await categories.json() };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();

  return (
    <>
      <Searchbar events={events} />
      {/* <Categorypicker categories={categories} /> */}
      <Heading>List of events</Heading>;
      {events.map((event) => {
        return (
          <Box key={event.id}>
            <Link to={`event/${event.id}`}>
              <Text>{event.title}</Text>
              <Text>{event.description}</Text>
              <Image src={event.image} alt={event.title}></Image>
              <Text>
                Start time event: {new Date(event.startTime).toLocaleString()}
              </Text>
              <Text>
                End time event: {new Date(event.endTime).toLocaleString()}
              </Text>
              {categories.map((category) =>
                event.categoryIds?.includes(category.id) ? (
                  <Text key={category.id}>{category.name}</Text>
                ) : null
              )}
            </Link>
          </Box>
        );
      })}
      <Button>
        <Link to={"event/new"}>Add event</Link>
      </Button>
    </>
  );
};
