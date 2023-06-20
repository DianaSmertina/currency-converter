import Link from 'next/link';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={'wrapper ' + styles.wrapper}>
        <Link href="/">Converter</Link>
        <Link href="/rates">Rates</Link>
      </div>
    </header>
  );
};

export default Header;
