import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { promptError } from "../assests/prompt";
import imageCompression from "browser-image-compression";

const initialState = {
  posts: [],
  status: null,
  error: null,
  createPostStatus: null,
  createPostError: null,
  edit: {
    value: false,
    id: null,
  },
};

const url = "https://memoverse-api.onrender.com";

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (thunkApi) => {
    try {
      const response = await axios.get(`${url}/api/post`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const fetchPost = createAsyncThunk(
  "posts/fetchPost",
  async (id, thunkApi) => {
    try {
      const response = await axios.get(`${url}/api/post/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData, thunkApi) => {
    try {
      const compressedImage = await imageCompression(formData.image, {
        maxSizeMB: 0.1,
        useWebWorker: true,
      });
      formData.image = compressedImage;
      const response = await axios.post(`${url}/api/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (data, thunkApi) => {
    const { formData, id } = data;
    try {

      const compressedImage = await imageCompression(formData.image, {
        maxSizeMB: 0.1,
        useWebWorker: true,
      });
      formData.image = compressedImage;
      const response = await axios.patch(`${url}/api/post/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const likePost = createAsyncThunk(
  "post/likepost",
  async (id, thunkApi) => {
    try {
      const response = await axios.post(`${url}/api/post/like/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, thunkApi) => {
    try {
      const response = await axios.delete(`${url}/api/post/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const postSlice = createSlice({
  initialState,
  name: "posts",
  reducers: {
    setEditbleTrue: (state, action) => {
      state.edit.value = true;
      state.edit.id = action.payload;
    },
    setEditableFalse: (state) => {
      state.edit.value = false;
      state.edit.id = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.status = null;
        state.posts = action.payload;
      })

      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = "failure";
      })
      .addCase(createPost.pending, (state, action) => {
        state.createPostStatus = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.createPostStatus = null;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.createPostStatus = "failure";
        state.createPostError = action.payload.error;
        promptError("Some error occured");
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(updatePost.rejected, () => {
        promptError("Some error occured");
      })
      .addCase(deletePost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failure";
        state.error = action.payload.error;
        promptError("Some error occured");
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = null;
        const indexToRemove = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        state.posts.splice(indexToRemove, 1);
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const post = state.posts.find((post) => post._id === action.payload.id);
        post.likes = action.payload.likes;
      })
      .addCase(likePost.rejected, () => {
        promptError("Some error occured");
      });
  },
});

// export  {setEditableFalse,setEditableFalse} = postSlice.actions;
const { setEditableFalse, setEditbleTrue } = postSlice.actions;
export { setEditableFalse, setEditbleTrue };

const postReducer = postSlice.reducer;
export default postReducer;
