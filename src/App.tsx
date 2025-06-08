import React from "react";
import "./App.css";
import StoreProvider from "./providers/StoreProvider";
import { BrowserRouter, Route, Routes } from "react-router";
import TodoHome from "@/pages/home/TodoHome";

const App: React.FC = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoHome />} />
          {/* <Route path="/active" element={<TodoHome />} />
          <Route path="/completed" element={<TodoHome />} /> */}
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
