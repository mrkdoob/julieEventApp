import {
  WrapItem,
  Box,
  VStack,
  Input,
  FormControl,
  InputGroup,
  InputLeftElement,
  FormLabel,
  Textarea,
  Button,
  Heading,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import { redirect } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useLoaderData } from "react-router-dom";

export const action = async ({ values }) => {
  values.createdBy = parseInt(values.createdBy);
  const newEvent = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(values),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => json.id);
  return redirect(`/event/${newEvent}`);
};

export const loader = async () => {
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");
  return { categories: await categories.json(), users: await users.json() };
};

export const NewEvent = () => {
  const { users, categories } = useLoaderData();

  const initialValues = {
    title: "",
    description: "",
    image: "",
    startTime: new Date(),
    endTime: new Date(),
    location: "",
    categoryIds: [],
    createdBy: 0,
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(6, "Event title is too short")
      .required("Event title is required"),
    description: Yup.string()
      .min(15, "Description is too short")
      .max(100, "Description is too long")
      .required("Description is required"),
    image: Yup.string().url("Insert image URL").required("Image is required"),
    startTime: Yup.date("Start time should be a valid date").required(
      "Start time is requiered"
    ),
    endTime: Yup.date("End time should be a valid date").required(
      "End time is requiered"
    ),
    location: Yup.string().required("Location is required"),
    categoryIds: Yup.array()
      .of(Yup.number())
      .required("Category selection is required"),
    createdBy: Yup.number().required("User selection is required"),
  });

  const onSubmit = (values, actions) => {
    action({ values });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => onSubmit(values, actions)}
    >
      {(formik) => {
        return (
          <WrapItem>
            <Box bg="white" borderRadius="lg">
              <Box m={8} color="#0B0E3F">
                <VStack
                  spacing={5}
                  as="form"
                  mx="auto"
                  w={{ base: "90%", md: "500" }}
                  h="100vh"
                  onSubmit={formik.handleSubmit}
                >
                  <Heading>Add event here</Heading>
                  <FormControl
                    id="title"
                    isInvalid={formik.errors.title && formik.touched.title}
                  >
                    <FormLabel>Event Title</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                      <InputLeftElement pointerEvents="none"></InputLeftElement>
                      <Input
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        onBlur={formik.handleBlur}
                      />
                      <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
                    </InputGroup>
                  </FormControl>
                  <FormControl
                    id="description"
                    isInvalid={
                      formik.errors.description && formik.touched.description
                    }
                  >
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      borderColor="gray.300"
                      _hover={{
                        borderRadius: "gray.300",
                      }}
                      placeholder="What's your event about?..."
                      onChange={formik.handleChange}
                      value={formik.values.description}
                      onBlur={formik.handleBlur}
                    />
                    <FormErrorMessage>
                      {formik.errors.description}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    id="image"
                    isInvalid={formik.errors.image && formik.touched.image}
                  >
                    <FormLabel>Image</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                      <InputLeftElement pointerEvents="none"></InputLeftElement>
                      <Input
                        onChange={formik.handleChange}
                        value={formik.values.image}
                        onBlur={formik.handleBlur}
                      />
                      <FormErrorMessage>{formik.errors.image}</FormErrorMessage>
                    </InputGroup>
                  </FormControl>
                  <FormControl
                    id="startTime"
                    isInvalid={
                      formik.errors.startTime && formik.touched.startTime
                    }
                  >
                    <FormLabel>Starttime</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                      <InputLeftElement pointerEvents="none"></InputLeftElement>
                      <input
                        type="datetime-local"
                        id="startTime"
                        onChange={formik.handleChange}
                        value={formik.values.startTime}
                        onBlur={formik.handleBlur}
                      />
                      <FormErrorMessage>
                        {formik.errors.startTime}
                      </FormErrorMessage>
                    </InputGroup>
                  </FormControl>
                  <FormControl
                    id="endTime"
                    isInvalid={formik.errors.endTime && formik.touched.endTime}
                  >
                    <FormLabel>Endtime</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                      <InputLeftElement pointerEvents="none"></InputLeftElement>
                      <input
                        type="datetime-local"
                        id="endTime"
                        onChange={formik.handleChange}
                        value={formik.values.endTime}
                        onBlur={formik.handleBlur}
                      />
                      <FormErrorMessage>
                        {formik.errors.endTime}
                      </FormErrorMessage>
                    </InputGroup>
                  </FormControl>

                  <FormControl
                    id="location"
                    isInvalid={
                      formik.errors.location && formik.touched.location
                    }
                  >
                    <FormLabel>Location</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                      <InputLeftElement pointerEvents="none"></InputLeftElement>
                      <Input
                        onChange={formik.handleChange}
                        value={formik.values.location}
                        onBlur={formik.handleBlur}
                      />
                      <FormErrorMessage>
                        {formik.errors.location}
                      </FormErrorMessage>
                    </InputGroup>
                  </FormControl>
                  <FormControl
                    id="categoryIds"
                    isInvalid={
                      formik.errors.categoryIds && formik.touched.categoryIds
                    }
                  >
                    <FormLabel>Category</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                      <InputLeftElement pointerEvents="none"></InputLeftElement>
                      <Select
                        name="categoryIds"
                        onChange={formik.handleChange}
                        value={formik.categoryIds}
                        onBlur={formik.handleBlur}
                        placeholder="Select Category"
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage>
                        {formik.errors.categoryIds}
                      </FormErrorMessage>
                    </InputGroup>
                  </FormControl>
                  <FormControl
                    id="createdBy"
                    isInvalid={
                      formik.errors.createdBy && formik.touched.createdBy
                    }
                  >
                    <FormLabel>Created By</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                      <InputLeftElement pointerEvents="none"></InputLeftElement>
                      <Select
                        name="createdBy"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.createdBy}
                        onBlur={formik.handleBlur}
                        placeholder="Select User"
                      >
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage>
                        {formik.errors.createdBy}
                      </FormErrorMessage>
                    </InputGroup>
                  </FormControl>

                  <FormControl id="button" float="right">
                    <Button
                      type="submit"
                      variant="solid"
                      bg="#0D74FF"
                      color="white"
                      _hover={{}}
                    >
                      Add Event
                    </Button>
                  </FormControl>
                </VStack>
              </Box>
            </Box>
          </WrapItem>
        );
      }}
    </Formik>
  );
};
