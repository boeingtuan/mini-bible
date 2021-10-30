export enum ApiStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

type SuccessResponse<T> = {
  result: ApiStatus.SUCCESS;
  data: T;
};

type ErrorResponse = {
  result: ApiStatus.ERROR;
  error: string;
};

type ApiResponse<T> = Promise<SuccessResponse<T> | ErrorResponse>;

type MaybeErrorResponse<T> = T & { error?: string };

export class Request {
  private static BASE_URL = 'https://bible-api.com/';

  public static async get<T>(endpoint: string): ApiResponse<T> {
    try {
      const response = await fetch(Request.BASE_URL + endpoint);
      const json = (await response.json()) as MaybeErrorResponse<T>;
      if (json.error) {
        return {
          result: ApiStatus.ERROR,
          error: json.error,
        };
      }
      return {
        result: ApiStatus.SUCCESS,
        data: json,
      };
    } catch (error) {
      return {
        result: ApiStatus.ERROR,
        error: 'Server error',
      };
    }
  }
}
