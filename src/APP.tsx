import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import LogIn from "./views/LogIn";
import PluginList from "./views/PluginList";
import TechnologyList from "./views/TechnologyList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/technology_list" />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="technology_list" element={<TechnologyList />} />
        <Route
          path="plugin_list/technology=:technology/id=:id"
          element={<PluginList />}
        />
      </Route>
      <Route path="/login" element={<LogIn />} />
    </Routes>
  );
}

export default App;
