import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

const selectHotelsState = (state: RootState) => state.hotels;

export const selectHotels = createSelector(selectHotelsState, (s) => s.hotels);
export const selectSelectedHotel = createSelector(selectHotelsState, (s) => s.selectedHotel);
export const selectHotelsLoading = createSelector(selectHotelsState, (s) => s.loading);
export const selectHotelsError = createSelector(selectHotelsState, (s) => s.error);
export const selectHotelsQuery = createSelector(selectHotelsState, (s) => s.query);
export const selectHotelsTotal = createSelector(selectHotelsState, (s) => s.total);

export const selectCurrentPage = createSelector(
  selectHotelsState,
  (s) => Math.floor((s.query.skip ?? 0) / (s.query.limit ?? 12)) + 1
);

export const selectTotalPages = createSelector(
  selectHotelsState,
  (s) => Math.max(1, Math.ceil(s.total / (s.query.limit ?? 12)))
);
