import ConverterForm from '@/components/converterForm/ConverterForm';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={'wrapper ' + styles.wrapper}>
      <h2>Currency Converter</h2>
      <ConverterForm />
    </div>
  );
}
