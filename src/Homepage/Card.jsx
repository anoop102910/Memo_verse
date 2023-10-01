import React, { useState, useSyncExternalStore } from "react";
import { FcLike } from "react-icons/fc";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../reducer/postReducer";
import EditButton from "./EditButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Image from "./Image";
import { promptError } from "../assests/prompt";
import TimeStamp from "./TimeStamp";

const Card = ({ post }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);
  const profileId = useSelector((state) => state.auth.userId);

  const { username, userId, title, message, image, likes, _id, createAt } =
    post;

  const id = _id;
  const slicedMessage = message.slice(0, 80);

  const handleLike = () => {
    if (!auth) {
      promptError("Signin required");
      return;
    }
    dispatch(likePost(id));
  };

  const handleDelete = () => {
    if (!auth) {
      promptError("Signin Required");
      return;
    }
    dispatch(deletePost(id));
  };

  return (
    <div id={id} className="w-[240px] bg-white rounded-lg shadow-md ">
      <div className="relative">
        <div className="card-image ">
          <Link to={`/:${id}`}>
            <Image
              style="w-full h-32 object-cover rounded-t-lg card-image relative "
              image={image}
            />
          </Link>
        </div>
        {userId === profileId && (
          <div className="absolute -top-1 right-1 z-20">
            <EditButton id={id} />
          </div>
        )}
        <span className="absolute top-2 left-2 text-white text-sm z-20">
          {username ? username : "Unknown"}
        </span>
        <TimeStamp
          time={createAt}
          style={"absolute top-7 left-2 text-white text-xs z-20"}
        />
      </div>

      <div className="p-4 flex flex-col justify-between h-44">
        <div>
          <Link to={`/${id}`}>
            <h2 className="text-[1.1rem] font-semibold ">{title}</h2>
          </Link>
          <p className="text-gray-700 text-[0.8rem]  my-3 break-words ">
            {slicedMessage}...
          </p>
        </div>

        <div className="flex justify-between items-center ">
          <div className="flex items-center  ">
            <button
              onClick={handleLike}
              className="text-blue-500 hover:text-blue-600 transition duration-300 mr-2 "
            >
              <FcLike size={25} />
            </button>
            <span className="text-gray-600">{likes}</span>
          </div>
          {userId === profileId && (
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-600 transition duration-300 "
            >
              <FaTrash size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
