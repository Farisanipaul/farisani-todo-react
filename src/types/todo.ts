export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  color: string;
}

export type LoadingStatus = "idle" | "loading" | "failed";
export type TodoFilter = "all" | "active" | "completed";

export interface TodosState {
  todos: Todo[];
  filter: TodoFilter;
  status: LoadingStatus;
  filterStatus: LoadingStatus;
}
