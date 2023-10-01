import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../reducer/postReducer";
import { useSelector } from "react-redux";
import { Pagination } from "@mui/material";
import { promptError } from "../assests/prompt";
import { setEditableFalse } from "../reducer/postReducer";
import styles from "../styles";

const Form = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.posts.createPostStatus);
  const auth = useSelector((state) => state.auth.auth);
  const edit = useSelector((state) => state.posts.edit);
  const posts = useSelector((state) => state.posts.posts);

  const imageRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    message: "",
    image: null,
  });

  useEffect(() => {
    if (edit.value) {
      const post = posts.find((post) => post._id == edit.id);
      setFormData({
        ...formData,
        title: post?.title,
        tag: post?.tag,
        message: post?.message,
      });
    }
  }, [edit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const clearForm = () => {
    setFormData({ title: "", tag: "", message: "", image: null });
    imageRef.current.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth) {
      promptError("Signin required");
      return;
    }
    const { title, tag, message, image } = formData;
    if (title.length != 0 && tag.length != 0 && message.length != 0 && image) {
      if (edit.value) {
        dispatch(updatePost({ formData, id: edit.id }));
        dispatch(setEditableFalse());
      } else dispatch(createPost(formData));
      clearForm();
    }
  };

  const handlePageChange = (page) => {};
  return (
    <>
      <div className="w-[400px] p-6 bg-white rounded-lg shadow-xl h-min">
        <h2 className="text-2xl font-semibold text-center mb-4">My Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-600">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={styles.btnSecondary}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tag" className="block text-gray-600">
              Tag
            </label>
            <input
              type="text"
              id="tag"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              className={styles.btnSecondary}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-600">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className={styles.btnSecondary}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-600">
              Upload Image
            </label>
            <input
              type="file"
              ref={imageRef}
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => {
                setFormData({ ...formData, image: e.target.files[0] });
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 "
            />
          </div>
          {formData.image && (
            <img
              className="mb-4 rounded-md "
              src={URL.createObjectURL(formData.image)}
              alt=""
            />
          )}

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-300 disabled:text-gray-500"
          >
            {status === "loading" ? "Uploading Image..." : "Submit"}
          </button>
        </form>
      </div>
      <div className="mt-5 mx-auto ml-9">
        <Pagination
          color="secondary"
          size="large"
          variant="outlined"
          count={5}
          onChange={(e, page) => {
            handlePageChange(page);
          }}
        />
      </div>
    </>
  );
};

export default Form;
