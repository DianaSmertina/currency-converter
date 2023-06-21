'use client';
import { useEffect } from 'react';
import { selectRatesData, setRates } from '@/redux/slices/rates';
import { useSelector, useDispatch } from '@/redux/store';
import { getRatesForBase } from '@/utilities/utilities';

const RatesList = () => {
  const ratesReduxData = useSelector(selectRatesData);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const ratesObject = await getRatesForBase(ratesReduxData.baseCurrency);
      if (typeof ratesObject === 'object' && ratesObject.conversion_rates) {
        dispatch(setRates(ratesObject.conversion_rates));
      }
    };
    fetchData(); //TODO: fix for first base currency when component mount
  }, []);

  return (
    <ul>
      {Object.entries(ratesReduxData.rates).map((el) => {
        return <li key={el[0]}>{`${el[0]}: ${el[1]}`}</li>;
      })}
    </ul>
  );
};

export default RatesList;
