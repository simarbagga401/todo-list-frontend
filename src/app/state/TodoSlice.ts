// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverUrl } from "../serverUrl";
import axios from "axios";

export const getAllTodos = createAsyncThunk("gettodos", async () => {
  const response = await axios.get(serverUrl);

  return response.data.payload;
});

export const addTodo = createAsyncThunk("addtodos", async (args) => {
  await axios.request({
    method: "POST",
    url: serverUrl,
    data: {
      todo: {
        id: args.id,
        name: args.name,
        description: args.description,
        completed: false,
      },
    },
  });
  const response = await axios.get(serverUrl);
  return response.data.payload;
});


export const deleteTodo = createAsyncThunk("deletetodos", async (args) => {
  await axios.request({
    method: "DELETE",
    url: serverUrl,
    data: {
      todo: {
        id: args.id,
      },
    },
  });
  const response = await axios.get(serverUrl);
  return response.data.payload;
});

export const updateTodo = createAsyncThunk("updatetodos", async (args) => {
  await axios.request({
    method: "PUT",
    url: serverUrl,
    data: {
      todo: {
        id: args.id,
        completed:args.completed
      },
    },
  });
  const response = await axios.get(serverUrl);
  console.log(response)
    return response.data.payload;
});

const todoSlice = createSlice({
  name: "todos",
  initialState: [
    { id: 1, name: "1st todo", description: "do something", completed: false },
  ],
  extraReducers: (builder) => {
    builder.addCase(getAllTodos.fulfilled, (state, action) => {
      // empty state
      while (state.length) {
        state.pop();
      }
      action.payload.map((todo) => {
        state.push(todo);
      });
    });

    builder.addCase(addTodo.fulfilled, (state, action) => {
      // empty state
      while (state.length) {
        state.pop();
      }
      action.payload.map((todo) => {
        state.push(todo);
      });
    });


    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      // empty state
      while (state.length) {
        state.pop();
      }
      action.payload.map((todo) => {
        state.push(todo);
      });
    });

    builder.addCase(updateTodo.fulfilled, (state, action) => {
      // empty state
      while (state.length) {
        state.pop();
      }
      action.payload.map((todo) => {
        state.push(todo);
      });
    });
  },
});

// export const {  markTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
