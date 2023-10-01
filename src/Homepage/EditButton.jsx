import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setEditbleTrue } from "../reducer/postReducer";

const EditButton = ({id}) => {
  const [hidden, setHidden] = useState(true);
  const dispatch = useDispatch();

  const handleEdit = ()=>{
    dispatch(setEditbleTrue(id));
  }

  return (
    <div
      onBlur={() => {
        setHidden(true);
      }}
      onClick={() => !hidden ? setHidden(true) : setHidden(false)}
      className="absolute right-3 top-1"
    >
      <BsThreeDots size={25} color="white" />
      <div
      onClick={handleEdit}
        className={`absolute top-2 -right-12 bg-white px-4 py-2 text-sm rounded-md shadow-md flex gap-3 items-center hover:bg-gray-100 ${
          hidden && "hidden"
        }`}
      >
        <FiEdit2 />
        <button>Edit</button>
      </div>
    </div>
  );
};

export default EditButton;
