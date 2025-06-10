import React from "react";
import "./TodoHome.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { TodoList } from "@/features/todo";

const TodoHome: React.FC = () => {
  return (
    <>
      <Header />
      <TodoList />
      <Footer />
    </>
  );
};

export default TodoHome;
