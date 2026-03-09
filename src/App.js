import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {

  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>

      <Navbar setSearch={setSearch} />

      <AppRoutes search={search} />

    </BrowserRouter>
  );
}

export default App;