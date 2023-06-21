import * as RTKQuery from '@reduxjs/toolkit/dist/query/react/index.js';
const { createApi, fetchBaseQuery } = ((RTKQuery as TypeRTKQuery).default ??
  RTKQuery) as typeof RTKQuery;
type TypeRTKQuery = typeof RTKQuery & { default?: unknown };

const apiKey = process.env.API_KEY;

export interface ApiResponse {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  conversion_rates: object;
}

export const exchangeRateApi = createApi({
  reducerPath: 'exchangeRateApi',
  baseQuery: fetchBaseQuery({ baseUrl: `https://v6.exchangerate-api.com/v6/${apiKey}/` }),
  endpoints: (build) => ({
    getRates: build.query<ApiResponse, string>({
      query: (currency) => `latest/${currency}`,
    }),
  }),
});

export const { useGetRatesQuery } = exchangeRateApi;
