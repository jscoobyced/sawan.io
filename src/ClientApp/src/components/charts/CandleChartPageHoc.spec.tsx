import { shallow } from 'enzyme';
import React from 'react';
import { TestUtils } from '../../../tests/TestUtils';
import { CandleChartPageHoc } from './CandleChartPageHoc';

test('CandleChartPageHoc snapshot.', () => {
    window.fetch = TestUtils.mockFetch(
        '[{"timestamp":1,"low":1.0,"high":1.0,"open":1.0,"close":1.0,"current":1.0,"volume":0.0}]');
    const candleChartPageHoc = shallow(<CandleChartPageHoc />);
    expect(candleChartPageHoc).toMatchSnapshot();
    expect(window.fetch).toHaveBeenCalledTimes(2);
});

test('CandleChartPageHoc can parse currency change event', () => {
    let currencyId = 0;
    const currencyChosen = '10';
    const fetchCurrencyData = (newCurrencyId: number) => {
        currencyId = newCurrencyId;
    };
    const candleChartPageHoc = new CandleChartPageHoc({}, {});
    candleChartPageHoc.fetchCurrencyData = fetchCurrencyData;
    const event = {
        preventDefault: () => {
            // Do nothing
        },
        target: {
            value: currencyChosen
        }
    } as React.ChangeEvent<HTMLSelectElement>;
    candleChartPageHoc.onChangeCurrency(event);

    expect(currencyId.toString()).toBe(currencyChosen);
});
