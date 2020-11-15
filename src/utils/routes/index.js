import Gallery from "../../Page/Gallery";
import Home from "../../Page/Home";
import Login from "../../Page/Login";
import SignUp from "../../Page/SignUp";
import Tensorflow from "../../Page/Tensorflow";

export default [
  {
    path: "/",
    exact: true,
    component: () => <Home />,
    protected: "none",
  },
  {
    path: "/gallery",
    exact: false,
    component: () => <Gallery />,
    protected: "auth",
  },

  {
    path: "/login",
    exact: false,
    component: () => <Login />,
    protected: "guest",
  },
  {
    path: "/signup",
    exact: false,
    component: () => <SignUp />,
    protected: "guest",
  },
  {
    path: "/tensorflow",
    exact: false,
    component: () => <Tensorflow />,
    protected: "none",
  },
];
