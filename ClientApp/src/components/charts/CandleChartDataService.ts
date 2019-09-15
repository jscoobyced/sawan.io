import { ApiUtils } from '../../utils/ApiUtils';
import { SelectOption } from '../Models';
import { Pairing } from './Models';

export class CandleChartDataService implements ICandleChartDataService {
  public fetchCurrencyData(currency: number): Promise<Pairing[]> {
    if (currency === undefined) {
      return Promise.resolve([]);
    }

    return ApiUtils.fetchData<Pairing[]>(`/api/Data/pairing/${currency}/5`);
  }

  public fetchCurrencies(): Promise<SelectOption[]> {
    return ApiUtils.fetchData<SelectOption[]>('/api/Data/currencies');
  }
}

export interface ICandleChartDataService {
    fetchCurrencyData(currency: number): Promise<Pairing[]>;
    fetchCurrencies(): Promise<SelectOption[]>;
}
