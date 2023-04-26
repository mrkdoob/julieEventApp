import { Select } from "@chakra-ui/react";
import { Formik } from "formik";

export const FilterEvents = ({ events, categories, setEventChoice }) => {
  // const handleCategoryChoice = (e) => {
  //   const categoryId = e.target.value;
  //   fetchCatergoryQuery(categoryId).then(({ event }) => {
  //     setEventChoice(event);
  //   });
  // };

  console.log(categories);

  // const eventTitles = events.map((event) => {
  //   return event.title;
  // });

  console.log(events.title);

  // const handleFilterChoice = (e) => {
  //   if (e.target.value == "az") {
  //     const azEvents = events.title.sort();
  //     setEventChoice(azEvents);
  //   }
  // };

  // GET /api/articles?sort[0]=title&sort[1]=slug   :asc

  return (
    <Formik>
      <Select
        fontWeight={"450"}
        color="black"
        width={250}
        mb={20}
        bg="white"
        ml={5}
        // placeholder="Filter Events"
        // onChange={handleFilterChoice}
      >
        <option value="az">A-z</option>
        <option value="date">Date</option>
        <option value="category">Category</option>
      </Select>
    </Formik>
  );
};
