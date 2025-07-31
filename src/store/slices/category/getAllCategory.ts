import { apiEndPoints } from "@/services/apis";
import makeApiRequest from "@/services/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllProductsCategoryAPI = createAsyncThunk(
  "category/fetchAll",
  async () => {
    try {
      const response = await makeApiRequest(apiEndPoints.productCategory, {
        method: "GET",
      });
      console.log("Fetched category:", response);

      return response;
    } catch (error) {
      console.error("Failed to fetch category:", error);
      throw error;
    }
  }
);

interface ProductsState {
  categories: unknown[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsCategoryAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProductsCategoryAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getAllProductsCategoryAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch products";
      });
  },
});

export default categorySlice.reducer;
