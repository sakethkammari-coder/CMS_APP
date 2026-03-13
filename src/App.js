import React, { useState } from "react";
import { HashRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {

  const [search, setSearch] = useState("");

  return (

    <HashRouter>

      <Navbar setSearch={setSearch} />

      <AppRoutes search={search} />

    </HashRouter>

  );

}

export default App;