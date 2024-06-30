import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import React from "react";
import App from "../App";
import {SignUp,SignIn ,Service,Marketing ,Orders , Clientage ,} from "@pages";
import Main from "../components/ui/main/MiniDrawer"

const index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" elemetn={<App />}>
        <Route index element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="main/*" element={<Main/>}>
          <Route index element={<Service/>} />
          <Route path="orders" element={<Orders/>} />
          <Route path="marketing" element={<Marketing/>} />
          <Route path="clientage" element={<Clientage/>} />


        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default index;