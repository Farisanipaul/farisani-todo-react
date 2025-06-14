# 📝 React Todo App

A beautifully simple yet powerful Todo App built with **React**, **TypeScript**, **Redux Toolkit**, and **localStorage**.

## ✨ Features

- ✅ **Add Todos** — Type a title in the `New Todo Input` and press Enter.
- ✏️ **Edit Todos** — Double-click to edit an item.
- 🔄 **Toggle Completion** — Check/uncheck items to mark them as completed.
- 🚮 **Delete Todos** — Remove individual items or clear all completed.
- 📂 **Filter Todos** — Switch views:
  - **All** — See all todos
  - **Active** — Only unfinished
  - **Completed** — Only finished
- 💾 **Persistent Storage** — Stored in `localStorage`, so your data stays even on refresh.
- ⚛️ **Redux Toolkit** — Global state management for todos.
- 🛠 **Built with TypeScript** — Fully typed and safe.
- ⚡️ **Fast & Modern** — Built with best practices in React and functional components.

## 📦 Tech Stack

- **React** + **TypeScript**
- **Redux Toolkit** with `createSlice`
- **localStorage** persistence
- **Vite** for fast builds and dev server
- **React Router** (hash-based or browser routing)
- **Custom Hooks** (`useAppSelector`, `useAppDispatch`)
- **CSS Modules or global styles** for styling

## 🖥️ UI Highlights

- 🆕 **Input Field** with placeholder: _“Type title...”_
- 🧮 **Todo Counter**: _“2 items left!”_
- 🔘 Filter buttons: **All | Active | Completed**
- ❌ Clear Button: _“Clear completed”_
- 📋 Accessible and keyboard-friendly

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/your-todo-app.git
cd your-todo-app
npm install
npm run dev
