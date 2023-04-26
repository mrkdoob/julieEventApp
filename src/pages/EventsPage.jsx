import React from "react";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Searchbar } from "../components/Searchbar";
import { Categorypicker } from "../components/Categorypicker";
import { FilterEvents } from "../components/filterEvents";
import { Box, Text, Button, Center, Flex } from "@chakra-ui/react";

export const loader = async () => {
  const events = await fetch(`http://localhost:3000/events`);
  const categories = await fetch("http://localhost:3000/categories");

  return { events: await events.json(), categories: await categories.json() };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();
  const [eventChoice, setEventChoice] = useState(events);

  return (
    <>
      <Box bg="black">
        <Text fontSize="7xl" color="gray.300" pl={5}>
          Upcoming Events
        </Text>

        <Flex mt={10} mr={25} justifyContent="flex-end">
          <Searchbar setEventChoice={setEventChoice} />
          <Categorypicker
            events={events}
            categories={categories}
            setEventChoice={setEventChoice}
          />
          <FilterEvents
            events={events}
            categories={categories}
            setEventChoice={setEventChoice}
          />
        </Flex>
        <Center>
          <Box className="eventList">
            {eventChoice ? (
              <Box>
                {eventChoice.map((event) => {
                  return (
                    <Link key={event.id} to={`event/${event.id}`}>
                      <Center
                        key={event.name}
                        backgroundImage={event.image}
                        p={4}
                        color="black"
                        pt={20}
                        pb={40}
                        pl={40}
                        pr={40}
                        ml={40}
                        mr={40}
                        mb={10}
                        w={{ base: "80px", md: "200px", lg: "1000px" }}
                        borderRadius="10"
                        borderColor="yellow.300"
                        borderWidth={4}
                      >
                        <Box
                          key={event.id}
                          bg="yellow.300"
                          p={2}
                          borderRadius={10}
                        >
                          <Text as="b">{event.title}</Text>
                          <Text>{event.description}</Text>
                          <Text>
                            Start time event:
                            {new Date(event.startTime).toLocaleString()}
                          </Text>
                          <Text>
                            End time event:
                            {new Date(event.endTime).toLocaleString()}
                          </Text>
                          <Box bg="gray.200" alignItems="flex-end">
                            {categories.map((category) =>
                              event.categoryIds?.includes(category.id) ? (
                                <Text key={category.id}>{category.name}</Text>
                              ) : null
                            )}
                          </Box>
                        </Box>
                      </Center>
                    </Link>
                  );
                })}
              </Box>
            ) : null}
          </Box>
        </Center>
        <Center>
          <Button bg="yellow.300" color="black" mt={55}>
            <Link to={"event/new"}>Add event</Link>
          </Button>
        </Center>
      </Box>
    </>
  );
};
