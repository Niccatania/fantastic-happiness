import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

import { Router, Route, Routes, Link } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";
import DevProfile from "./pages/DevProfile";
import Checkout from "./pages/Checkout";

import { ChakraProvider } from "@chakra-ui/react";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    // Wrap application in chakra provider at root(TIffany)
    // <div>
    //   <ChakraProvider>
    //     <ApolloProvider client={client}>
    //       <Router>
    //         <div>
    //           {/* <NavBar /> */}
    //           {/* Move this to NavBar */}
    //           <nav>
    //             <ul>
    //               <li>
    //                 <Link to="/">Landing</Link>
    //               </li>
    //               <li>
    //                 <Link to="/login">Login</Link>
    //               </li>
    //               <li>
    //                 <Link to="/profile">My Profile</Link>
    //               </li>
    //               <li>
    //                 <Link to="/devProfile/:devId">Developer Profile</Link>
    //               </li>
    //               <li>
    //                 <Link to="/profile/checkout">Checkout</Link>
    //               </li>
    //               <li>
    //                 <Link to="/services">Services</Link>
    //               </li>
    //               <li>
    //                 <Link to="/profile/newProject">New Project</Link>
    //               </li>
    //             </ul>
    //           </nav>

    //           <Routes>
    //             <Route path="/" element={<Landing />} />

    //             <Route path="/login" element={<Login />} />

    //             <Route path="/profile" element={<Profile />} />

    //             <Route path="/devProfile/:devId" element={<DevProfile />} />

    //             <Route path="/profile/checkout" element={<Checkout />} />

    //             {/* <Route path = "/services">
    //         <Services />
    //       </Route> */}
    //             {/* <Route path to ="/profile/newProject">
    //         <NewProject />
    //       </Route> */}
    //           </Routes>
    //         </div>
    //       </Router>
    //     </ApolloProvider>
    //   </ChakraProvider>
    // </div>

    <div>
      <ChakraProvider>
        <Profile />
      </ChakraProvider>
    </div>
  );
}
