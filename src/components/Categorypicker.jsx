import { Select } from "@chakra-ui/react";
import { Formik } from "formik";

// fetchen gekozen categorie
export const Categorypicker = ({ setEventChoice, categories }) => {
  const fetchCatergoryQuery = async (categoryId) => {
    const categoryEvents = await fetch(
      `http://localhost:3000/events?&categoryIds_like=${categoryId}`
    );
    return {
      event: await categoryEvents.json(),
    };
  };

  // aanroepen fetch van gekozen categorie en state veranderen voor eventspage
  const handleCategoryChoice = (e) => {
    const categoryId = e.target.value;
    fetchCatergoryQuery(categoryId).then(({ event }) => {
      setEventChoice(event);
    });
  };

  return (
    <Formik>
      <Select
        fontWeight={"450"}
        color="black"
        width={250}
        bg="white"
        name="categoryIds"
        onChange={handleCategoryChoice}
        placeholder="Search by category"
        mb={3}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
    </Formik>
  );
};
