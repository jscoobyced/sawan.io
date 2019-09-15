import React from 'react';
import { CandleChartCurrencyProps } from './Models';

export const CandleChartCurrencySelector = (props: CandleChartCurrencyProps) => {
  const { currencyOptions: propsCurrencyOptions } = props;
  const currencyOptions = propsCurrencyOptions.map(selectOption => (
    <option
      key={selectOption.value}
      value={selectOption.value}
    >
      {selectOption.text}
    </option>
  ));

  const { onChangeCurrency } = props;

  return (
    <select
      id="currencySelector"
      onChange={onChangeCurrency}
    >
      {currencyOptions}
    </select>
  );
};
