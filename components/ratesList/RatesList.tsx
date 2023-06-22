'use client';
import { useEffect, useState } from 'react';
import { selectRatesData } from '@/redux/slices/rates';
import { useSelector } from '@/redux/store';
import { getRatesForBase } from '@/utilities/utilities';

const RatesList = () => {
  const ratesReduxData = useSelector(selectRatesData);
  const [ratesList, setRatesList] = useState<object>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRatesForBase(ratesReduxData.baseCurrency);
      if (typeof response === 'object') {
        setRatesList(response.conversion_rates);
      }
    };

    fetchData();
  }, [ratesReduxData]);

  if (!ratesList) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {ratesList &&
        Object.entries(ratesList).map((el) => {
          return <li key={el[0]}>{`1 ${ratesReduxData.baseCurrency} = ${el[1]} ${el[0]}`}</li>;
        })}
    </ul>
  );
};

export default RatesList;
