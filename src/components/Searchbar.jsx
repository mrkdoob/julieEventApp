import { Input } from "@chakra-ui/react";
// import { useLoaderData } from "react-router-dom";
// import { useState } from "react";

export const loader = async (eventChoice) => {
  const choosenEvent = await fetch(
    `http://localhost:3000/events?q=${eventChoice}`
  );

  return {
    event: await choosenEvent.json(),
  };
};

export const Searchbar = () => {
  //   const { events } = useLoaderData();

  //   const [eventChoice, setEventChoice] = useState("");

  const handleEventChoice = (e) => {
    const eventChoice = e.target.value;
    console.log(eventChoice);
    loader(eventChoice);
  };

  //   const choosenEvent = events.filter((event) => {
  //     if (eventChoice) {
  //       return (
  //         event === eventChoice &&
  //         (event.title.toLowerCase().includes(eventChoice.toLowerCase()) ||
  //           event.description.toLowerCase().includes(eventChoice.toLowerCase()))
  //       );
  //     }
  //   });

  //   loader(choosenEvent);

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
