import React from "react";
import Container from "./Container";
import Form from "./Form";

const Homepage = () => {
  return (
    <div className="flex p-3">
      <div className=" w-[calc(100%-420px)] max-[800px]:w-full ">
        <Container />
      </div>
      <div className="max-[800px]:hidden pl-5">
        <Form />
      </div>
    </div>
  );
};

export default Homepage;
