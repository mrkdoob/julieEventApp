import { Input } from "@chakra-ui/react";

export const Searchbar = ({ setEventChoice }) => {
  const fetchBySearchQuery = async (eventChoice) => {
    const choosenEvent = await fetch(
      `http://localhost:3000/events?q=${eventChoice}`
    );
    return {
      event: await choosenEvent.json(),
    };
  };

  const handleEventChoice = (e) => {
    const eventChoice = e.target.value;
    fetchBySearchQuery(eventChoice).then(({ event }) => {
      setEventChoice(event);
    });
  };

  return (
    <Input
      onChange={handleEventChoice}
      fontWeight={"450"}
      color="blue.600"
      placeholder="Search for event here.."
      width={300}
      mb={20}
      mr={5}
      bg="white"
    ></Input>
  );
};
