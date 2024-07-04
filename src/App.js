import "bootstrap/dist/css/bootstrap.min.css";

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { auth } from "./firebase";
import Login from "./pages/Login";
import WhatsApp from "./pages/WhatsApp";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <WhatsApp /> : <Login />} />
      </Routes>
    </Router>
  );
};

export default App;
