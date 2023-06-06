import React from 'react';
import { EditEvent } from '../components/EditEvent';
import { useLoaderData, Link, useNavigate } from 'react-router-dom';
import background from '../images/background.jpeg';
import {
  Box,
  Text,
  Image,
  Button,
  useToast,
  Center,
  Flex,
} from '@chakra-ui/react';

// fetchen benodigdheden
export const loader = async ({ params }) => {
  const event = await fetch(
    `https://my-musicevents.herokuapp.com/events/${params.eventId}`,
  );
  const users = await fetch('https://my-musicevents.herokuapp.com/users');
  const categories = await fetch(
    'https://my-musicevents.herokuapp.com/categories',
  );
  return {
    event: await event.json(),
    users: await users.json(),
    categories: await categories.json(),
  };
};

export const EventPage = () => {
  const { users, event, categories } = useLoaderData();
  const navigate = useNavigate();
  const toast = useToast();

  // deleten en terug sturen naar eventspagina
  const deleteEvent = async (eventId) => {
    try {
      await fetch(`https://my-musicevents.herokuapp.com/events/${eventId}`, {
        method: 'DELETE',
      });
      navigate(`/`);
      toast({
        title: 'Event deleted.',
        status: 'success',
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Event not deleted.',
        status: 'error',
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  // aanroepen delete request
  const handleDeleteEvent = (eventId) => {
    deleteEvent(eventId);
  };

  return (
    <>
      <Box bg="black" color="yellow.300">
        <Center>
          <Box
            backgroundImage={background}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            borderWidth="3px"
            borderColor="yellow.300"
            w={{ sm: '400px', lg: '600px' }}
          >
            <Flex flexDirection="column" alignItems="center" pl={5} pr={5}>
              <Text fontSize="5xl">{event.title}</Text>
              <Text as="em" fontSize="2xl" mb={10}>
                {event.description}
              </Text>
            </Flex>
            <Box>
              <Image
                src={event.image}
                alt={event.title}
                h={400}
                w={600}
              ></Image>
              <Box mt={10} pl={5}>
                <Text as="b">Start time event:</Text>
                <Text> {new Date(event.startTime).toLocaleString()}</Text>
                <Text as="b">End time event:</Text>
                <Text> {new Date(event.endTime).toLocaleString()}</Text>
                <Text as="b">Location:</Text>
                <Text> {event.location}</Text>
              </Box>
            </Box>
            <Box w={{ sm: '360px', lg: '580px' }}>
              <Flex direction="column" alignItems="flex-end">
                <Text as="b" mr={2}>
                  Created by
                </Text>
                {users.map((user) =>
                  user.id === event.createdBy ? (
                    <Box key={user.id}>
                      <Image
                        src={user.image}
                        h={75}
                        w={75}
                        borderRadius="50%"
                      ></Image>
                      <Text mb={1}>{user.name}</Text>
                    </Box>
                  ) : null,
                )}
              </Flex>
            </Box>
          </Box>
        </Center>
        <Center mt={20}>
          <Button
            bg="yellow.300"
            color="black"
            mr={20}
            className="delete button"
            onClick={() => {
              const confirmBox = window.confirm(
                'Do you really want to delete this Event?',
              );
              if (confirmBox === true) {
                handleDeleteEvent(event.id);
              }
            }}
          >
            Delete this event
          </Button>

          <EditEvent
            event={event}
            users={users}
            categories={categories}
            eventId={event.id}
          />
        </Center>
        <Center>
          <Link to="/">
            <Button bg="yellow.300" mt={40}>
              <Text fontSize="2xl" color="black">
                Back to all events
              </Text>
            </Button>
          </Link>
        </Center>
      </Box>
    </>
  );
};
