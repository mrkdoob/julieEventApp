import { Link, useLoaderData, redirect } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { MultiSelect } from "primereact/multiselect";
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
  useToast,
  Center,
  Text,
} from "@chakra-ui/react";

export const loader = async () => {
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");
  return { categories: await categories.json(), users: await users.json() };
};

export const NewEvent = () => {
  const toast = useToast();
  const { users, categories } = useLoaderData();

  const addEvent = async ({ values }) => {
    values.createdBy = parseInt(values.createdBy);
    const newEvent = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.ok)
        toast({
          title: "Event added succesfully.",
          status: "success",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        })
          .then((res) => res.json())
          .then((json) => json.id);
      else
        toast({
          title: "Event not added.",
          status: "error",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });

      return redirect(`/event/${newEvent}`);
    });
  };

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
      .min(4, "Event title is too short")
      .required("Event title is required"),
    description: Yup.string()
      .min(15, "Description is too short")
      .max(100, "Description is too long")
      .required("Description is required"),
    image: Yup.string().required("Image is required"),
    startTime: Yup.date().required("Start time is requiered"),
    endTime: Yup.date().required("End time is requiered"),
    location: Yup.string().required("Location is required"),
    // categoryIds: Yup.number().required("Category selection is required"),
    createdBy: Yup.number().required("User selection is required"),
  });

  const onSubmit = (values, actions) => {
    addEvent({ values });
    actions.resetForm();
  };

  return (
    <Center>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => onSubmit(values, actions)}
      >
        {(formik) => {
          return (
            <Box bg="black" w="100%">
              <Box m={8} color="yellow.300">
                {" "}
                <WrapItem>
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
                        <FormErrorMessage>
                          {formik.errors.title}
                        </FormErrorMessage>
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
                        <FormErrorMessage>
                          {formik.errors.image}
                        </FormErrorMessage>
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
                      isInvalid={
                        formik.errors.endTime && formik.touched.endTime
                      }
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
                        <MultiSelect
                          id="category"
                          name="categoryIds"
                          onChange={formik.handleChange}
                          value={formik.values.categoryIds}
                          onBlur={formik.handleBlur}
                          placeholder="Select Category"
                          options={categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        ></MultiSelect>
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
                      <Center>
                        <Button
                          bg="yellow.300"
                          color="black"
                          mt={10}
                          type="submit"
                        >
                          Add Event
                        </Button>{" "}
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
                    </FormControl>
                  </VStack>
                </WrapItem>
              </Box>
            </Box>
          );
        }}
      </Formik>
    </Center>
  );
};
