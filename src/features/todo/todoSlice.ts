import type { Todo, TodoFilter, TodosState } from "@/types/todo";
import storage from "@/utils/storage";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const getTodos = createAsyncThunk(
  "todo/getTodos",
  async (): Promise<Todo[]> => {
    const todos = storage.get<Todo[]>("todos");
    if (!todos) throw new Error("Failed to get todos");
    return todos;
  }
);

const getTodoFilter = createAsyncThunk(
  "todo/getTodoFilter",
  async (): Promise<TodoFilter> => {
    const filter = storage.get<TodoFilter>("filter");
    if (!filter) throw new Error("Failed to get filter");
    return filter;
  }
);

const initialState: TodosState = {
  todos: [],
  filter: "all",
  status: "loading",
  filterStatus: "loading",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setActiveFilter: (state, action: PayloadAction<TodoFilter>) => {
      state.filter = action.payload;
    },
    addTodo: (
      state,
      action: PayloadAction<Omit<Todo, "id" | "createdAt" | "completed">>
    ) => {
      state.todos.push({
        id: uuidv4(),
        title: action.payload.title,
        completed: false,
        createdAt: new Date().toISOString(),
        description: action.payload.description,
      });
      storage.save("todos", state.todos);
    },
    updateTodo: (
      state,
      action: PayloadAction<
        Omit<Todo, "createdAt" | "completed" | "description">
      >
    ) => {
      state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo
      );
      storage.save("todos", state.todos);
    },
    removeTodo: (state, action: PayloadAction<{ id: string }>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      storage.save("todos", state.todos);
    },
    toggleTodo: (state, action: PayloadAction<{ id: string }>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      storage.save("todos", state.todos);
    },
    toggleAllTodos: (state, action: PayloadAction<{ completed: boolean }>) => {
      state.todos = state.todos.map((todo) =>
        todo.completed !== action.payload.completed
          ? { ...todo, completed: action.payload.completed }
          : todo
      );
      storage.save("todos", state.todos);
    },
    removeCompletedTodos: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
      storage.save("todos", state.todos);
    },
    clearAllTodos: (state) => {
      state.todos = [];
      storage.delete("todos");
      state.filter = "all";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(getTodoFilter.pending, (state) => {
        state.filterStatus = "loading";
      })
      .addCase(getTodoFilter.fulfilled, (state, action) => {
        state.filterStatus = "idle";
        state.filter = action.payload;
      })
      .addCase(getTodoFilter.rejected, (state) => {
        state.filterStatus = "failed";
      });
  },
});

export const {
  addTodo,
  updateTodo,
  removeTodo,
  clearAllTodos,
  toggleAllTodos,
  toggleTodo,
  removeCompletedTodos,
  setActiveFilter,
} = todoSlice.actions;

export { getTodos, getTodoFilter };

export default todoSlice;
