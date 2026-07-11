import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  getHotels,
  getHotelById,
  type HotelQueryParams,
} from "../../services/hotelService";

import type { Hotel } from "../../types/hotel";

interface HotelState {
  hotels: Hotel[];
  selectedHotel: Hotel | null;

  loading: boolean;
  error: string | null;

  query: HotelQueryParams;

  total: number;
}

const initialState: HotelState = {
  hotels: [],
  selectedHotel: null,

  loading: false,
  error: null,

  query: {
    search: "",
    name: "",
    location: "",

    price: undefined,
    price_min: undefined,
    price_max: undefined,

    rating: undefined,
    rating_min: undefined,
    rating_max: undefined,

    ordering: "",

    limit: 12,
    skip: 0,
  },

  total: 0,
};

/* ===========================
   Fetch Hotels
=========================== */

export const fetchHotels = createAsyncThunk(
  "hotels/fetchHotels",
  async (params: HotelQueryParams | undefined, thunkAPI) => {
    try {
      return await getHotels(params);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ?? "Failed to fetch hotels"
        );
      }

      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

/* ===========================
   Fetch Hotel By Id
=========================== */

export const fetchHotelById = createAsyncThunk(
  "hotels/fetchHotelById",
  async (id: number, thunkAPI) => {
    try {
      return await getHotelById(id);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ?? "Failed to fetch hotel"
        );
      }

      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

/* ===========================
   Slice
=========================== */

const hotelSlice = createSlice({
  name: "hotels",

  initialState,

  reducers: {
    setQuery(state, action) {
      state.query = {
        ...state.query,
        ...action.payload,
      };
    },

    resetQuery(state) {
      state.query = initialState.query;
    },

    setSelectedHotel(state, action) {
      state.selectedHotel = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      /* Fetch Hotels */

      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload.data;
        state.total = action.payload.count;
      })

      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* Fetch Hotel By Id */

      .addCase(fetchHotelById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchHotelById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedHotel = action.payload;
      })

      .addCase(fetchHotelById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setQuery,
  resetQuery,
  setSelectedHotel,
} = hotelSlice.actions;

export default hotelSlice.reducer;