'use client';
import { useEffect, useState } from 'react';

import { selectRatesData } from '@/redux/slices/rates';
import { useSelector } from '@/redux/store';
import { getRatesForBase } from '@/utilities/utilities';
import Loading from '../loading/Loading';

import styles from './RateList.module.scss';

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
    return <Loading />;
  }

  return (
    <ul className={styles.list}>
      {ratesList &&
        Object.entries(ratesList).map((el) => {
          return (
            <li key={el[0]}>
              {`1 ${ratesReduxData.baseCurrency} = ${el[1]} `}
              <b>{el[0]}</b>
            </li>
          );
        })}
    </ul>
  );
};

export default RatesList;
