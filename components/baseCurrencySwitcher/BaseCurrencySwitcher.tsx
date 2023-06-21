'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '@/redux/store';
import { selectRatesData, setBaseCurrency, setRates } from '@/redux/slices/rates';
import { ApiResponse, getCurrencyList, getRatesForBase } from '@/utilities/utilities';

const BaseCurrencySwitcher = ({ ratesData }: { ratesData: string | ApiResponse }) => {
  const ratesReduxData = useSelector(selectRatesData);
  const dispatch = useDispatch();
  const [baseCurrencyState, setBaseCurrencyState] = useState('');

  useEffect(() => {
    setBaseCurrencyState(ratesReduxData.baseCurrency);
  }, []);

  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const newBaseCurrency = e.target.value;
    dispatch(setBaseCurrency(newBaseCurrency));
    setBaseCurrencyState(newBaseCurrency);
    const ratesObject = await getRatesForBase(newBaseCurrency);
    if (typeof ratesObject === 'object' && ratesObject.conversion_rates) {
      dispatch(setRates(ratesObject.conversion_rates));
    }
  };

  return (
    <>
      <div>Choose your currency:</div>
      <select value={baseCurrencyState} onChange={(e) => handleChange(e)}>
        {typeof ratesData !== 'string' && getCurrencyList(ratesData)}
      </select>
    </>
  );
};

export default BaseCurrencySwitcher;
