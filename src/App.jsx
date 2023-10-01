import React, { useEffect } from "react";
import Homepage from "./Homepage/Homepage";
import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import Signin from "./Signin/Signin";
import Signup from "./Signup/Signup";
import { authUser } from "./reducer/authSlice";
import { useDispatch } from "react-redux";
import PostPage from "./Post/PostPage";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authUser());
  });


  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="signin"  element={<Signin/>}  />
          <Route path="signup" element={<Signup />} />
          <Route path="/:id" element={<PostPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
