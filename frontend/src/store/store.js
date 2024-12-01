import { configureStore } from "@reduxjs/toolkit";
import repoSlice from "./slices/repoSlice";
import querySlice from "./slices/querySlice";

export const store = configureStore({
  reducer: {
    repo: repoSlice,
    queries: querySlice,
  },
});
