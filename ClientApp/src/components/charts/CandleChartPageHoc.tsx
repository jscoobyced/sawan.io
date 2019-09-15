import React from 'react';
import { SelectOption } from '../Models';
import { CandleChartComponent } from './CandleChartComponent';
import { CandleChartCurrencySelector } from './CandleChartCurrencySelector';
import { CandleChartDataService, ICandleChartDataService } from './CandleChartDataService';
import { CandleChartDataServiceMock } from './CandleChartDataServiceMock';
import { CandleChartPageData } from './Models';

export class CandleChartPageHoc extends React.Component<{}, CandleChartPageData> {
  private readonly service: ICandleChartDataService;

  private readonly defaultCurrencyId = 1;

  constructor(props: any, state: any) {
    super(props, state);
    const { mode } = process.env;
    this.service = mode === 'development' ? new CandleChartDataServiceMock() : new CandleChartDataService();
    this.state = {
      pairings: [],
      loadingCurrencyData: false,
      loadingCurrencies: false,
      currency: '',
      currencyOptions: [],
    };
  }

  public fetchCurrencyData = (currencyId: number) => {
    const { loadingCurrencyData } = this.state;
    if (loadingCurrencyData) {
      return;
    }
    this.setState({
      loadingCurrencyData: true,
    });
    this.service.fetchCurrencyData(currencyId)
      .then((data) => {
        this.setState({
          pairings: data,
          loadingCurrencyData: false,
        });
      });
  }

  public readonly fetchCurrencies = () => {
    const { loadingCurrencies } = this.state;
    if (loadingCurrencies) {
      return;
    }
    this.setState({
      loadingCurrencies: true,
    });
    this.service.fetchCurrencies()
      .then((data) => {
        this.setState({
          currencyOptions: data,
          loadingCurrencies: false,
        });
      });
  }

  public componentDidMount = () => {
    this.fetchCurrencies();
    this.fetchCurrencyData(this.defaultCurrencyId);
  }

  public readonly onChangeCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    let currencyId = this.defaultCurrencyId;
    if (event.target.value) {
      currencyId = parseInt(event.target.value, 10);
    }
    this.fetchCurrencyData(currencyId);
  }

  public render() {
    const {
      pairings, loadingCurrencyData, currency, currencyOptions,
    } = this.state;
    return (
      <div>
        <CandleChartCurrencySelector
          onChangeCurrency={this.onChangeCurrency}
          currencyOptions={currencyOptions}
        />
        <CandleChartComponent
          pairings={pairings}
          loading={loadingCurrencyData}
          currency={currency}
        />
      </div>
    );
  }
}
