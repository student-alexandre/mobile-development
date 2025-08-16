import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../services/api";

export const fetchById = createAsyncThunk(
  "products/fetchById",
  async (id: string) => {
    const { data } = await api.get(`/products/${id}`);
    return data as Product;
  }
);

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  thumbnail?: string;
};

type ProductsState = {
  loading: boolean;
  error: string | null;
  byCategory: Record<string, Product[]>;
  current: Product | null; 
};

const initialState: ProductsState = {
  loading: false,
  error: null,
  byCategory: {},
  current: null,
};

export const fetchByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (category: string) => {
    const { data } = await api.get(`/products/category/${category}`);
    return { category, products: data.products as Product[] };
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProducts: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.byCategory[action.payload.category] = action.payload.products;
      })
      .addCase(fetchByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao carregar produtos";
      })
      .addCase(fetchById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
    .addCase(fetchById.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload;
    })
    .addCase(fetchById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Erro ao carregar produto";
    })
},
});

export const { resetProducts } = productsSlice.actions;
export default productsSlice.reducer;
