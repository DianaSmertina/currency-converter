import ConverterForm from '@/components/converterForm/ConverterForm';
import { getRatesForBase } from '@/utilities/utilities';
import styles from './page.module.scss';

export default async function Home() {
  const rates = await getRatesForBase('USD');

  return (
    <div className={'wrapper ' + styles.wrapper}>
      <h2 className={styles.title}>Currency Converter</h2>
      <ConverterForm ratesData={rates} />
    </div>
  );
}
