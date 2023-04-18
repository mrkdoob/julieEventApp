import { Input } from "@chakra-ui/react";
import { redirect } from "react-router-dom";

export const Searchbar = (setEventChoice) => {
  const loader = async (eventChoice) => {
    const choosenEvent = await fetch(
      `http://localhost:3000/events?q=${eventChoice}`
    )
      .then((res) => res.json())
      .then((json) => json.id);
    return redirect(`/event/${choosenEvent}`);
  };

  const handleEventChoice = (e) => {
    const eventChoice = e.target.value;
    console.log(eventChoice);
    loader(eventChoice).then(({ event }) => {
      setEventChoice(event);
    });
  };
  return (
    <Input
      onChange={handleEventChoice}
      fontWeight={"450"}
      color="blue.600"
      placeholder="Search for event here.."
      width={500}
      mb={20}
      bg="white"
    ></Input>
  );
};
