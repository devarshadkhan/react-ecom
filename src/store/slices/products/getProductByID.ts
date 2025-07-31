import { apiEndPoints } from "@/services/apis";
import makeApiRequest from "@/services/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProductsByIDAPI = createAsyncThunk(
  "products/fetchById",
  async (id) => {
    try {
      const response = await makeApiRequest(`${apiEndPoints.getAllProducts}/${id}`, {
        method: "GET",
      });
      console.log("Fetched product:", response);
      return response;
    } catch (error) {
      console.error("Failed to fetch product:", error);
      throw error;
    }
  }
);


interface ProductsState {
  productDetail: object
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  productDetail: {},
  loading: false,
  error: null,
};

const getProductByIDSlice = createSlice({
  name: "single-product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsByIDAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsByIDAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetail = action.payload;
      })
      .addCase(getProductsByIDAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch products";
      });
  },
});

export default getProductByIDSlice.reducer;
