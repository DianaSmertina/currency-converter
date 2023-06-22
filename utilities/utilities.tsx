import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export interface ApiResponse {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  conversion_rates?: object;
  conversion_rate?: number;
}

export async function getRatesForBase(baseCurrency: string): Promise<ApiResponse | string> {
  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`
    );
    return response.data;
  } catch (error) {
    return 'Oooops, request failed';
  }
}

export async function getPairCourse(
  firstCurrency: string,
  secondCurrency: string
): Promise<ApiResponse | string> {
  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${firstCurrency}/${secondCurrency}`
    );
    return response.data;
  } catch (error) {
    return 'Oooops, request failed';
  }
}

export function getCurrencyList(apiRatesResponses: ApiResponse) {
  if (typeof apiRatesResponses.conversion_rates === 'object') {
    return Object.keys(apiRatesResponses.conversion_rates).map((currency) => {
      return (
        <option key={currency} value={currency}>
          {currency}
        </option>
      );
    });
  }
}
