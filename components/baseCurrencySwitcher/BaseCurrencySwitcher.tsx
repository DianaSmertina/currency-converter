'use client';
import { ChangeEvent, useEffect, useState } from 'react';

import { useDispatch, useSelector } from '@/redux/store';
import { selectRatesData, setBaseCurrency } from '@/redux/slices/rates';
import { ApiResponse, getCurrencyList } from '@/utilities/utilities';

import styles from './BaseCurrencySwitcher.module.scss';

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
  };

  return (
    <>
      <p className={styles.title}>Choose your currency:</p>
      <select
        value={baseCurrencyState}
        onChange={(e) => handleChange(e)}
        className={'form_field ' + styles.select}
      >
        {typeof ratesData !== 'string' && getCurrencyList(ratesData)}
      </select>
    </>
  );
};

export default BaseCurrencySwitcher;
