// import { Select } from "@chakra-ui/react";
// import { Formik } from "formik";
// // import { useLoaderData } from "react-router-dom";
// import { useState } from "react";

// export const loader = async ({ params }) => {
//   const category = await fetch(
//     `http://localhost:3000/categories/${params.categoryChoice}`
//   );

//   return {
//     category: await category.json(),
//   };
// };

// export const Categorypicker = () => {
//   //   const { category } = useLoaderData();

//   const [categoryChoice, setCategoryChoice] = useState('');

//   loader(categoryChoice);

//   const handleCategoryChoice = (event) => {
//     setCategoryChoice(event.target.value);
//     console.log(categoryChoice);
//   };

//   return (
//     <Formik>
//       <Select
//         name="categoryIds"
//         onChange={handleCategoryChoice}
//         // value={categoryChoice}
//         placeholder="Search by category"
//       >
//         {categories.map((category) => (
//           <option key={category.id} value={category.id}>
//             {category.name}
//           </option>
//         ))}
//       </Select>
//     </Formik>
//   );
// };
