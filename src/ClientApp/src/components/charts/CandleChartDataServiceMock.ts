import { ApiUtils } from '../../utils/ApiUtils';
import { SelectOption } from '../Models';
import { CandleChartDataService } from './CandleChartDataService';
import { Pairing } from './Models';

export class CandleChartDataServiceMock extends CandleChartDataService {

    public fetchCurrencyData(currency: number): Promise<Pairing[]> {
        return ApiUtils.fetchData<Pairing[]>('/data.json');
    }

    public fetchCurrencies(): Promise<SelectOption[]> {
        return ApiUtils.fetchData<SelectOption[]>(`/currencies.json`);
    }
}
