import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import firebase from "../config/firebase";
import { useHistory } from "react-router-dom";
import AppContext from "../store/AppContext";

export default function Header() {
  const [isLoggedIn] = useContext(AppContext);
  const history = useHistory();

  function logout() {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        history.replace("/login");
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  }

  return (
    <nav className="p-5 bg-red-300 text-white flex justify-between">
      <ul className="flex justify-between px-10">
        <li className="mx-3">
          <NavLink exact={true} activeClassName="underline text-red-600" to="/">
            Home
          </NavLink>
        </li>

        <li className="mx-3">
          <NavLink activeClassName="underline text-red-600" to="/gallery">
            Gallery
          </NavLink>
        </li>
        <li className="mx-3">
          <NavLink activeClassName="underline text-red-600" to="/tensorflow">
            Tensorflow
          </NavLink>
        </li>
      </ul>
      <ul className="flex justify-between px-10">
        <li className="mx-3">
          {isLoggedIn ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <NavLink activeClassName="underline text-red-600" to="/login">
              Login
            </NavLink>
          )}
        </li>

        <li className="mx-3">
          {!isLoggedIn && (
            <NavLink activeClassName="underline text-red-600" to="/signup">
              SignUp
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
