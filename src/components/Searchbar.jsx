import { Input } from '@chakra-ui/react';

// fetchen getypte event
export const Searchbar = ({ setEventChoice }) => {
  const fetchBySearchQuery = async (eventChoice) => {
    const choosenEvent = await fetch(
      `https://my-musicevents.herokuapp.com/events?q=${eventChoice}`,
    );
    return {
      event: await choosenEvent.json(),
    };
  };

  // aanroepen fetch van getype event en state veranderen voor eventspage
  const handleEventChoice = (e) => {
    const eventChoice = e.target.value;
    fetchBySearchQuery(eventChoice).then(({ event }) => {
      setEventChoice(event);
    });
  };

  return (
    <Input
      onChange={handleEventChoice}
      fontWeight={'450'}
      color="blue.600"
      placeholder="Search for event here.."
      width={250}
      bg="white"
      mb={3}
    ></Input>
  );
};
