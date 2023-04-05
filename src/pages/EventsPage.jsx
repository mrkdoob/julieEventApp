import React from "react";
import { Heading } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const catagories = await fetch("http://localhost:3000/catagories");

  return { events: await events.json(), catagories: await catagories.json() };
};

export const EventsPage = () => {
  const { events, catagories } = useLoaderData();

  return (
    <>
      <Heading>List of events</Heading>;
      {events.map((event) => {
        <ul>
          <h1>event.title</h1>
          <li>event.description</li>
          <img>event.image</img>
          <li>event.startTime</li>
          <li>event.endTime</li>
          <li>event.categoryIds</li>
        </ul>;
      })}
    </>
  );
};
