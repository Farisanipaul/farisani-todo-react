import {
  configureStore,
  type Action,
  type ThunkAction,
} from "@reduxjs/toolkit";
import todoSlice from "@/features/todo/todoSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      todo: todoSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
