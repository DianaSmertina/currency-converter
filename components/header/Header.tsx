import Link from 'next/link';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={'wrapper ' + styles.wrapper}>
        <div className={styles.logo}></div>
        <nav className={styles.navigation}>
          <Link href="/">Converter</Link>
          <Link href="/rates">Rates</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
