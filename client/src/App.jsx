import React, { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import NotesManager from "./pages/NotesManager";
import { UserContext } from "./context/UserContext";

const App = () => {
  const { token } = useContext(UserContext);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {token && <Route path="/dashboard" element={<NotesManager />} />}
      <Route path="/*" element={<PageNotFound />} />
      {/* <Route path="/" element={<HomePage/>}/> */}
    </Routes>
  );
};

export default App;
