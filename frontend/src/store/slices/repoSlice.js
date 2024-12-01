import { createSlice } from "@reduxjs/toolkit";

const repoSlice = createSlice({
  name: "repo",
  initialState: {
    url: "",
    isLoading: false,
    isError: true,
  },
  reducers: {
    initializeProcess: (state, action) => {
      //if any other things required to start the the process these things will be set here.
      const { url } = action.payload;
      state.url = url;
    },
    setUrl: (state, action) => {
      state.url = action.payload;
    },
  },
});

export default repoSlice.reducer;
export const { initializeProcess, setUrl } = repoSlice.actions;
