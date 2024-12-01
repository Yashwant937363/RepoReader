import { createSlice } from "@reduxjs/toolkit";

const querySlice = createSlice({
  name: "queries",
  initialState: {
    queries: [],
  },
  reducers: {
    addQuery: (state, action) => {
      const queries = new Array(...state.queries);
      queries.push({ query: action.payload, answer: "", status: "pending" });
      state.queries = queries;
    },
  },
});

export default querySlice.reducer;
export const { addQuery } = querySlice.actions;
