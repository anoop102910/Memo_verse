import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authUser } from "../reducer/authSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles"

const Signup = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.auth);

  if (auth) {
    navigate("/");
    return null;
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().min(2).max(20),
    lastName: Yup.string().min(2).max(20),
    email: Yup.string().email("Email must be valid email"),
    password: Yup.string().min(8),
    confirmPassword: Yup.string().min(8).oneOf(
      [Yup.ref("password"), null],
      "Password and Confirm Password do not match"
    ),
  });

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://memoverse-api.onrender.com/api/user/signup",
        values,
        { withCredentials: true }
      );
      if (response) {
        toast.success("User created succussfully");
      }
      dispatch(authUser());
      navigate("/");
    } catch (error) {
      toast.error("Some error occured", { autoClose: 1000 });
    }
  };

  return (
    <div className="w-full bg-gray-500 h-[200vh] pt-3">
      <div className="bg-white p-6 rounded-md shadow-md max-w-[450px] mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="firstName"
                    className={styles.labelPrimary}
                  >
                    First Name
                  </label>
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={styles.bgPrimary}
                    placeholder="Type here"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="lastName"
                    className={styles.labelPrimary}
                  >
                    Last Name
                  </label>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={styles.bgPrimary}
                    placeholder="Type here"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>
              </div>

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
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className={styles.labelPrimary}
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className={styles.bgPrimary}
                  placeholder="Type here"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.signupBtn}
              >
                {isSubmitting ? "Loading...." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-3">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link className="underline text-sm text-indigo-500" to="/signin">
              Signin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
