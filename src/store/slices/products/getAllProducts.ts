import { apiEndPoints } from "@/services/apis";
import makeApiRequest from "@/services/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllProductsAPI = createAsyncThunk(
  "products/fetchAll",
  async () => {
    try {
      const response = await makeApiRequest(apiEndPoints.getAllProducts, {
        method: "GET",
      });
      console.log("Fetched products:", response);

      return response;
    } catch (error) {
      console.error("Failed to fetch products:", error);
      throw error;
    }
  }
);

interface ProductsState {
  items: unknown[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProductsAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getAllProductsAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch products";
      });
  },
});

export default productsSlice.reducer;
