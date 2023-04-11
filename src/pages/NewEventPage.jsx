// import { Form, useLoaderData, redirect } from "react-router-dom";

// export const action = async ({ request }) => {
//   const formData = Object.fromEntries(await request.formData());
//   const newId = await fetch("http://localhost:3000/posts", {
//     method: "POST",
//     body: JSON.stringify(formData),
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((res) => res.json())
//     .then((json) => json.id);
//   return redirect(`/post/${newId}`);
// };

// export const loader = async () => {
//   return await fetch("http://localhost:3000/users");
// };

// export const NewEventPage = () => {
//   const users = useLoaderData();
//   return (

//   );
// };
