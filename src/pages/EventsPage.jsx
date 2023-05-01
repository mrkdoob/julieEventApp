import React from "react";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Searchbar } from "../components/Searchbar";
import { Categorypicker } from "../components/Categorypicker";
import { FilterEvents } from "../components/FilterEvents";
import {
  Box,
  Text,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";

// fetchen benodigdheden
export const loader = async () => {
  const events = await fetch(`http://localhost:3000/events?_page=1&_limit=5`);
  const categories = await fetch("http://localhost:3000/categories");

  return { events: await events.json(), categories: await categories.json() };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();
  const [eventChoice, setEventChoice] = useState(events);
  const [isOpen, setIsOpen] = useState(true);

  // fetchen van alle evenementen (er van uitgaande niet meer dan 200)
  const moreEventsLoader = async () => {
    const moreEvents = await fetch(
      `http://localhost:3000/events?_page=1&_limit=200`
    );
    const allEvents = await moreEvents.json();
    setEventChoice(allEvents);
  };

  // aanroepen fetch funtie van alle evenementen
  const handleMoreEventsLoader = () => moreEventsLoader();

  // onzichtbaar maken van de show more button wanneer alle evenementen gedisplayed zijn
  function toggle() {
    setIsOpen((isOpen) => !isOpen);
  }
  return (
    <>
      <Box bg="black" h="100%" w="100%">
        <Text fontSize="7xl" color="gray.300" pl={5}>
          Upcoming Events
        </Text>

        <Flex
          direction={{ sm: "column", lg: "row" }}
          justifyContent="flex-end"
          alignItems="flex-end"
          mt={10}
          mr={25}
          mb={40}
        >
          <Searchbar setEventChoice={setEventChoice} />
          <Categorypicker
            categories={categories}
            setEventChoice={setEventChoice}
          />
          <FilterEvents events={events} setEventChoice={setEventChoice} />
        </Flex>
        <Center>
          <Box className="eventList">
            {eventChoice ? (
              <Box>
                {eventChoice.map((event) => {
                  return (
                    <Link key={event.id} to={`event/${event.id}`}>
                      <Center>
                        <Grid
                          key={event.name}
                          backgroundImage={event.image}
                          color="black"
                          pt={20}
                          pb={20}
                          pl={40}
                          pr={40}
                          ml={40}
                          mr={40}
                          mb={20}
                          h={{ sm: "370px", lg: "700px" }}
                          w={{ sm: "80px", lg: "1200px" }}
                          borderRadius="10"
                          borderColor="yellow.300"
                          borderWidth={4}
                          justifyContent="space-around"
                          alignItems="center"
                        >
                          <GridItem
                            key={event.id}
                            bg="yellow.300"
                            p={2}
                            borderRadius={10}
                            w={{ sm: "200px", lg: "400px" }}
                            h={{ sm: "200px", lg: "270px" }}
                          >
                            <Text
                              as="b"
                              fontSize={{
                                base: "17px",

                                lg: "35px",
                              }}
                            >
                              {event.title}
                            </Text>
                            <Text
                              fontSize={{
                                base: "14px",

                                lg: "25px",
                              }}
                            >
                              {event.description}
                            </Text>
                            <Text
                              fontSize={{
                                base: "12px",

                                lg: "20px",
                              }}
                            >
                              Start time event:
                              {new Date(event.startTime).toLocaleString()}
                            </Text>
                            <Text
                              fontSize={{
                                base: "12px",

                                lg: "20px",
                              }}
                            >
                              End time event:
                              {new Date(event.endTime).toLocaleString()}
                            </Text>
                            <Center mt={{ sm: "1", lg: "5" }}>
                              <Box bg="gray.200" borderRadius={5}>
                                {categories.map((category) =>
                                  event.categoryIds?.includes(category.id) ? (
                                    <Text
                                      fontSize={{
                                        base: "12px",

                                        lg: "20px",
                                      }}
                                      key={category.id}
                                    >
                                      {category.name}
                                    </Text>
                                  ) : null
                                )}
                              </Box>
                            </Center>
                          </GridItem>
                        </Grid>
                      </Center>
                    </Link>
                  );
                })}
              </Box>
            ) : null}
          </Box>
        </Center>
        <Center>
          <Box className="showMore">
            {isOpen && (
              <Button
                bg="yellow.300"
                color="black"
                mt={25}
                onClick={() => {
                  handleMoreEventsLoader(), toggle();
                }}
              >
                <Text as="em">Show more events..</Text>
              </Button>
            )}
          </Box>
        </Center>
        <Center>
          <Button bg="yellow.300" color="black" mt={100}>
            <Link to={"event/new"}>Add event</Link>
          </Button>
        </Center>
      </Box>
    </>
  );
};
