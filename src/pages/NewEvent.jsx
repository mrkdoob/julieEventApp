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
} from "@chakra-ui/react";
import { redirect } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export const action = async ({ values }) => {
  const newEvent = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(values),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => json.id);
  return redirect(`/post/event/${newEvent}`);
};

export const loader = async () => {
  return await fetch("http://localhost:3000/events");
};

export const NewEvent = () => {
  const formik = useFormik({
    initialValues: {
      event: "",
      date: "",
      starttime: "",
      endtime: "",
      category: "",
      description: "",
    },
    validationSchema: Yup.object({
      event: Yup.string()
        .required("Eventname required")
        .min(6, "Eventname is too short"),
      date: Yup.string().required("Date is required dd/mm/yyyy"),
      starttime: Yup.string().required("Time is required --:--"),
      endtime: Yup.string().required("Time is required --:--"),
      category: Yup.string().required("Category is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values, actions) => {
      action(values);
      actions.resetForm();
    },
  });

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
              id="event"
              isInvalid={formik.errors.event && formik.touched.event}
            >
              <FormLabel>Event</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftElement pointerEvents="none"></InputLeftElement>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.event}
                  onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.event}</FormErrorMessage>
              </InputGroup>
            </FormControl>
            <FormControl
              id="date"
              isInvalid={formik.errors.date && formik.touched.date}
            >
              <FormLabel>Date</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftElement pointerEvents="none"></InputLeftElement>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.date}
                  onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.date}</FormErrorMessage>
              </InputGroup>
            </FormControl>
            <FormControl
              id="starttime"
              isInvalid={formik.errors.starttime && formik.touched.starttime}
            >
              <FormLabel>Starttime</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftElement pointerEvents="none"></InputLeftElement>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.starttime}
                  onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.starttime}</FormErrorMessage>
              </InputGroup>
            </FormControl>
            <FormControl
              id="endtime"
              isInvalid={formik.errors.endtime && formik.touched.endtime}
            >
              <FormLabel>Endtime</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftElement pointerEvents="none"></InputLeftElement>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.endtime}
                  onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.endtime}</FormErrorMessage>
              </InputGroup>
            </FormControl>
            <FormControl
              id="category"
              isInvalid={formik.errors.category && formik.touched.category}
            >
              <FormLabel>Category</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftElement pointerEvents="none"></InputLeftElement>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.category}
                  onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.category}</FormErrorMessage>
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
              <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
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
};
