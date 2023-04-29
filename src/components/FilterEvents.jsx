import { Select } from "@chakra-ui/react";
import { Formik } from "formik";

//fetchen gekozen filters
export const FilterEvents = ({ setEventChoice, events }) => {
  const fetchByAz = async () => {
    const sortedAzEvents = await fetch(
      "http://localhost:3000/events?_sort=title&_order=asc"
    );
    return { sortedAzEvents: await sortedAzEvents.json() };
  };

  const fetchByDate = async () => {
    const sortedDateEvents = await fetch(
      "http://localhost:3000/events?_sort=startTime&_order=asc"
    );
    return { sortedDateEvents: await sortedDateEvents.json() };
  };

  const fetchByCategory = async () => {
    const sortedCategoryEvents = await fetch(
      "http://localhost:3000/events?_sort=categoryIds&_order=asc"
    );
    return { sortedCategoryEvents: await sortedCategoryEvents.json() };
  };

  // aanroepen fetch van gekozen filter en state veranderen voor eventspage
  const handleFilterChoice = (e) => {
    if (e.target.value == "az") {
      fetchByAz().then(({ sortedAzEvents }) => {
        setEventChoice(sortedAzEvents);
      });
    }

    if (e.target.value == "date") {
      fetchByDate().then(({ sortedDateEvents }) => {
        setEventChoice(sortedDateEvents);
      });
    }

    if (e.target.value == "category") {
      fetchByCategory().then(({ sortedCategoryEvents }) => {
        setEventChoice(sortedCategoryEvents);
      });
    } else {
      setEventChoice(events);
    }
  };

  return (
    <Formik>
      <Select
        fontWeight={"450"}
        color="black"
        width={250}
        bg="white"
        placeholder="Filter Events"
        onChange={handleFilterChoice}
        mb={3}
      >
        <option value="az">A-z</option>
        <option value="date">Date</option>
        <option value="category">Category</option>
      </Select>
    </Formik>
  );
};
