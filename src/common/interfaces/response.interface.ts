export interface IStandardResponse<T> {
  statusCode: number;
  success: boolean;
  data: T | null;
  message: string;
}
