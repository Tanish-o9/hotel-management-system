import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchHotels, setQuery, resetQuery } from "../features/hotels/hotelSlice";
import {
  selectHotels,
  selectHotelsLoading,
  selectHotelsError,
  selectHotelsQuery,
  selectCurrentPage,
  selectTotalPages,
} from "../features/hotels/hotelSelectors";

export const useHotels = () => {
  const dispatch = useAppDispatch();
  const hotels = useAppSelector(selectHotels);
  const loading = useAppSelector(selectHotelsLoading);
  const error = useAppSelector(selectHotelsError);
  const query = useAppSelector(selectHotelsQuery);
  const currentPage = useAppSelector(selectCurrentPage);
  const totalPages = useAppSelector(selectTotalPages);

  useEffect(() => {
    dispatch(fetchHotels(query));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, query.search, query.location, query.ordering, query.rating, query.price_min, query.price_max, query.limit, query.skip]);

  const goNext = () => {
    if (currentPage < totalPages)
      dispatch(setQuery({ skip: (query.skip ?? 0) + (query.limit ?? 12) }));
  };

  const goPrev = () => {
    if (currentPage > 1)
      dispatch(setQuery({ skip: (query.skip ?? 0) - (query.limit ?? 12) }));
  };

  const reset = () => dispatch(resetQuery());

  return { hotels, loading, error, query, currentPage, totalPages, goNext, goPrev, reset };
};
