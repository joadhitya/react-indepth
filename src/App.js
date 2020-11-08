import React, { useState, useEffect } from "react";
import "./assets/css/style.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";
import routes from "./utils/routes/index";
import Header from "./components/Header";
import firebase from "./config/firebase";
import AppContext from "./store/AppContext";
import AuthRoute from "./utils/routes/AuthRoute";
import Login from "./Page/Login";
import GuestRoute from "./utils/routes/GuestRoute";
import Loading from "./components/Loading";
import NotFound from "./Page/404";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedRoute from "./utils/routes/AnimatedRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  // const AppContext = React.createContext({ loggedIn: false, user: {} });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
        setIsLoading(false);
      } else {
        setUser({});
        setIsLoggedIn(false);
        setIsLoading(false);
      }
    });
  }, []);

  // const [title, setTitle] = useState("Halo");
  // const [isShowing, setIsShowing] = useState(false);
  // const [didMount, setDidMount] = useState(false);
  // const mountRef = useRef(false);

  // Component Did Mount
  // useEffect(() => {
  //   setDidMount(true);
  //   console.log("App Mountet");
  // }, []);

  // Component Will Update
  // useEffect(() => {
  //   if (mountRef.current) {
  //     console.log("Update 2");
  //   } else {
  //     mountRef.current = true;
  //   }
  // }, [isShowing]);

  // function handleClick() {
  //   setIsShowing(!isShowing);
  // }
  const location = useLocation();

  if (isLoading) return <Loading />;
  return (
    <Router>
      <AppContext.Provider value={[isLoggedIn, user]}>
        <Header />
        <AnimatePresence initial={false}>
          <Switch key={location.pathname}>
            {routes.map((route, index) => {
              if (route.protected === "guest") {
                if (isLoggedIn) {
                  return (
                    <GuestRoute
                      key={index}
                      path={route.path}
                      exact={route.exact}
                    >
                      <motion.div initial={{ x: 200 }} animate={{ x: 0 }}>
                        <route.component />
                      </motion.div>
                    </GuestRoute>
                  );
                } else {
                  return (
                    <AnimatedRoute
                      key={index}
                      path={route.path}
                      exact={route.exact}
                    >
                      <route.component />
                    </AnimatedRoute>
                  );
                }
              }

              if (route.protected === "auth" || route.protected === "none") {
                return (
                  <AuthRoute key={index} path={route.path} exact={route.exact}>
                    <route.component />
                  </AuthRoute>
                );
              }
            })}
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </AnimatePresence>
      </AppContext.Provider>
    </Router>
  );
}

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { title: "Helo", isShowing: false };
//     this.handleClick = this.handleClick.bind(this);
//     console.log('app cons')
//   }

//   handleClick() {
//     this.setState({ isShowing: !this.state.isShowing });
//   }

//   componentDidMount() {
//     console.log('app mount')
//     this.setState({title: 'life'})
//   }

//   componentDidUpdate(prevProps, prevState) {
//     console.log('App updated')
//   }

//   render() {
//     console.log('app render')
//     return (
//       <section className="flex justify-center">
//         <div className="w-1/2">
//           <div className="text-center">
//             <div className="my-4">{this.state.title}</div>
//             <div>
//               <button
//                 className="p-1 bg-blue-700 text-white my-2"
//                 onClick={this.handleClick}
//               >
//                 Toggle Image
//               </button>
//               {this.state.isShowing ? (
//                 <Images/>
//               ) : null}
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }
// }
export default App;
