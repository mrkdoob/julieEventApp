import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage, loader as eventLoader } from "./pages/EventPage";
import { EventsPage, loader as eventlistLoader } from "./pages/EventsPage";
import {
  NewEvent,
  loader as categoryLoader,
  action as createEvent,
} from "./pages/NewEvent";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: eventlistLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: eventLoader,
        //action: editEvent
      },
      {
        path: "/event/new",
        element: <NewEvent />,
        loader: categoryLoader,
        action: createEvent,
      },
      // {
      //   path: "/post/new",
      //   element: <NewPost />,
      //   action: createPost,
      //   loader: newPostLoader,
      // },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
