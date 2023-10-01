import { createSlice ,current} from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import Cookie from "js-cookie";
const initialState = {
  auth: false,
  userId: null,
  username: null,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    authUser: (state) => {
      const token = Cookie.get('token');
      if(!token) return state;
      const data = jwtDecode(token);
      return {...state,auth:true,userId:data.userId,username:data.username}
    },
    logout:(state)=>{
      Cookie.remove('token');
      return {...state,auth:false,userId:null,username:null}
    }
  },
});

export const {authUser,logout} = authSlice.actions;
const  authReducer = authSlice.reducer;
export default authReducer;