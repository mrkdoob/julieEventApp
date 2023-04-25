import { Formik } from "formik";
import * as Yup from "yup";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  WrapItem,
  VStack,
  Input,
  FormControl,
  InputGroup,
  InputLeftElement,
  FormLabel,
  Textarea,
  FormErrorMessage,
  Select,
  Button,
  Box,
  Heading,
  // Toast,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { redirect } from "react-router-dom";

// import { useRouteLoaderData } from "react-router-dom";

export const EditEvent = (event) => {
  //   const { categories, users } = useRouteLoaderData("root");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const eventEdit = event.event;
  const eventCategories = event.categories;
  const eventUsers = event.users;

  const editEventFetch = async ({ values }, evenEditId) => {
    values.createdBy = parseInt(values.createdBy);
    const editedEvent = await fetch(
      `http://localhost:3000/events/${evenEditId}`,
      {
        method: "PUT",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((json) => json.id);
    toast({
      title: "Event edited succesfully.",
      status: "success",
      duration: 5000,
      position: "top-right",
      isClosable: true,
    });
    toast({
      title: "Event not edited.",
      status: "error",
      duration: 5000,
      position: "top-right",
      isClosable: true,
    });
    redirect(`/event/${editedEvent}`);
  };

  const onSubmit = (values, eventEditId, actions) => {
    editEventFetch({ values }, eventEditId);
    actions.resetForm();
  };

  const initialValues = {
    title: eventEdit.title,
    description: eventEdit.description,
    image: eventEdit.image,
    startTime: eventEdit.startTime,
    endTime: eventEdit.endTime,
    location: eventEdit.location,
    categoryIds: eventEdit.categoryIds,
    createdBy: eventEdit.createdBy,
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(6, "Event title is too short")
      .required("Event title is required"),
    description: Yup.string()
      .min(15, "Description is too short")
      .max(100, "Description is too long")
      .required("Description is required"),
    image: Yup.string().required("Image is required"),
    startTime: Yup.date().required("Start time is requiered"),
    endTime: Yup.date().required("End time is requiered"),
    location: Yup.string().required("Location is required"),
  });

  return (
    <>
      <Button bg="yellow.300" color="black" onClick={onOpen}>
        Edit this event
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{event.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, actions) =>
                onSubmit(values, eventEdit.id, actions)
              }
            >
              {(formik) => {
                return (
                  <WrapItem>
                    <Box bg="blackAlpha.800" borderRadius="lg">
                      <Box m={8} color="yellow.300">
                        <VStack
                          spacing={5}
                          as="form"
                          mx="auto"
                          w={{ base: "90%", md: "500" }}
                          h="100vh"
                          onSubmit={formik.handleSubmit}
                        >
                          <Heading>Edit event here</Heading>
                          <FormControl
                            id="title"
                            isInvalid={
                              formik.errors.title && formik.touched.title
                            }
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
                              formik.errors.description &&
                              formik.touched.description
                            }
                          >
                            <FormLabel>Description</FormLabel>
                            <Textarea
                              borderColor="gray.300"
                              _hover={{
                                borderRadius: "gray.300",
                              }}
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
                            isInvalid={
                              formik.errors.image && formik.touched.image
                            }
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
                              formik.errors.startTime &&
                              formik.touched.startTime
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
                                placeholder={eventEdit.startTime}
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
                                placeholder={eventEdit.endTime}
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
                              formik.errors.categoryIds &&
                              formik.touched.categoryIds
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
                              >
                                {eventCategories.map((category) => (
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
                              formik.errors.createdBy &&
                              formik.touched.createdBy
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
                              >
                                {eventUsers.map((user) => (
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
                            <Button bg="yellow.300" color="black" type="submit">
                              Edit event
                            </Button>
                          </FormControl>
                        </VStack>
                      </Box>
                    </Box>
                  </WrapItem>
                );
              }}
            </Formik>
          </ModalBody>

          <ModalFooter>
            <Button bg="yellow.300" color="black" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
