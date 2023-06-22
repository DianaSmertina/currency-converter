import BaseCurrencySwitcher from '@/components/baseCurrencySwitcher/BaseCurrencySwitcher';
import { getRatesForBase } from '@/utilities/utilities';
import RatesList from '@/components/ratesList/RatesList';

import styles from './page.module.scss';

export default async function Rates() {
  const rates = await getRatesForBase('USD');

  return (
    <div className={'wrapper ' + styles.wrapper}>
      <h2>All rates</h2>
      <BaseCurrencySwitcher ratesData={rates} />
      <RatesList />
    </div>
  );
}
