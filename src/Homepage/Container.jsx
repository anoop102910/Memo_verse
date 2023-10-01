import React, { useEffect } from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchAllPosts } from "../reducer/postReducer";
import { SyncLoader } from "react-spinners";

const Container = () => {
  const dispatch = useDispatch();

  const status = useSelector((state) => {
    return state.posts.status;
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(fetchAllPosts());
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const posts = useSelector((state) => {
    return state.posts.posts;
  });

  if (status == "failure") {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center overflow-hidden">
        <h1 className="text-5xl text-red-500 font-bold">
          Something went wrong
        </h1>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="ml-[400px] mt-64">
        <SyncLoader />
      </div>
    );
  }

  return (
    <div
     className="flex  flex-wrap gap-x-8 gap-y-6 pl-[7%]"
     >
      {posts.length !== 0 &&
        posts.map((post, index) => {
          return <Card key={index} post={post} />;
          // return <MuiCard/>
        })}
    </div>
  );
};

export default Container;
