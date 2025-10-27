import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFiles as fetchFilesAPI } from '../../services/api';

export const fetchFiles = createAsyncThunk(
    'files/fetchFiles',
    async (fileName = '', { rejectWithValue }) => {
        try {
              const data = await fetchFilesAPI(fileName);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const filesSlice = createSlice({
  name: 'files',
  initialState: {
    data: [],
    loading: false,
    error: null,
    filter: ''
  },
  reducers: {
    clearFiles: (state) => {
      state.data = [];
      state.error = null;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearFiles, setFilter } = filesSlice.actions;
export default filesSlice.reducer;