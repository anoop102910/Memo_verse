import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link,use} from "react-router-dom";
import { toast } from "react-toastify";
import { authUser } from "../reducer/authSlice";
import {useDispatch,useSelector} from "react-redux"
import styles from '../styles'

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error,setError] = useState({err:null});
  const [loading,setLoading] = useState(null);
  const auth = useSelector(state=>state.auth.auth);

  if(auth){
    navigate('/')
    return null;
  }

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required")
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true)
      const response = await axios.post(
        "https://memoverse-api.onrender.com/api/user/signin",
        values,
        {
          withCredentials:true
        }
      );
      setLoading(false)
      dispatch(authUser())
      navigate('/');
      toast.success("You are succussfully logged in")
    } catch (error) {
      setLoading(false);
      toast.error("Some error occured. Please try again")
    }
  };

  return (
    <div className="w-full bg-gray-500 h-[200vh] pt-4">
      <div className="bg-white p-6 rounded-md shadow-md w-[350px] mt-20 mx-auto ">
        <h2 className="text-2xl font-semibold mb-4">Signin</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className={styles.labelPrimary}
              >
                Email
              </label>
              <Field
                type="text"
                id="email"
                name="email"
                className={styles.bgPrimary}
                placeholder="Type here"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.errorMessage}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className={styles.labelPrimary}
              >
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className={styles.bgPrimary}
                placeholder="Type here"
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.errorMessage}
              />
              {error.err && (
                <div className="text-red-500 text-xs absolute m-auto my-1 mb-2">
                  {error.message}
                </div>
              )}
            </div>
            <button
              type="submit"
              className={styles.signupBtn}
            >
              {loading ? 'Signing in...' :'Sign in'}
            </button>
          </Form>
        </Formik>
        <div className="text-center mt-3">
          <p className="text-sm text-gray-600">
            Don't have an account :{" "}
            <Link className="underline text-sm text-indigo-500" to="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
