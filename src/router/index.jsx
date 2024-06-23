import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
  } from "react-router-dom";
  import React from "react";
  import App from "../App";
  import {SignIn , SignUp} from "../pages/index";
  
  const index = () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<SignIn/>}/>
                <Route path="sign-up" element={<SignUp/>} /> 
        </Route>
      )
    );
  
    return <RouterProvider router={router} />;
  };
  export default index;