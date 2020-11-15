import React from "react";
import { useHistory } from "react-router-dom";
import firebase from "../config/firebase";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

export default function SignUp() {
  const history = useHistory();
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(value, formikBag) => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(value.email, value.password)
          .then((res) => {
            history.replace("/");
          })
          .catch(function (error) {
            formikBag.setFieldError("email", error.message);
          });
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required("Email is Required")
          .email("Email is Invalid"),
        password: Yup.string().required("Password is Required").min(6),
      })}
    >
      <div className="flex h-screen bg-red-100">
        <div className="m-auto w-1/3 text-white flex flex-wrap justify-center shadow-lg rounded-lg bg-gradient-to-tr from-blue-200 to-red-300">
          <h1 className="w-full text-4xl tracking-widest text-center my-5">
            SignUp
          </h1>
          <Form className="m-5 w-10/12">
            <div className="w-full my-6">
              <Field
                name="email"
                className="p-2 rounded shadow w-full text-black"
                placeholder="Email"
                type="email"
              />
              <ErrorMessage name="email" />
            </div>
            <div className="w-full my-6">
              <Field
                name="password"
                className="p-2 rounded shadow w-full text-black"
                placeholder="Password"
                type="password"
              />
              <ErrorMessage name="password" />
            </div>
            <div className="w-full my-6">
              <button
                type="submit"
                className="p-2 rounded shadow-md w-full bg-gradient-to-tr from-orange-200 to-green-300 text-black"
              >
                SignUp
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Formik>
  );
}
