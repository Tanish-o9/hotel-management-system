
export interface ApiResponse<T> {
  status: number;
  count: number;
  returned: number;
  message: string;
  data: T;
}