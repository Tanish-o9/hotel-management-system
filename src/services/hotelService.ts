import api from "./api";
import type { ApiResponse } from "../types/api";
import type { Hotel } from "../types/hotel";
export interface HotelQueryParams {
  search?: string;
  name?: string;
  location?: string;

  price?: number;
  price_min?: number;
  price_max?: number;

  rating?: number;
  rating_min?: number;
  rating_max?: number;

  ordering?: string;

  limit?: number;
  skip?: number;
}

export const getHotels = async (
  params?: HotelQueryParams
): Promise<ApiResponse<Hotel[]>> => {
  const { data } = await api.get<ApiResponse<Hotel[]>>("/hotels/", {
    params,
  });

  return data;
};
export const getHotelById = async (id: number): Promise<Hotel> => {
  const { data } = await api.get<ApiResponse<Hotel>>(`/hotels/${id}/`);

  return data.data;
};