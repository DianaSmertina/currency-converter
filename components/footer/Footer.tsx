import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="wrapper">
        <div className={styles.wrapper}>
          <a href="https://github.com/DianaSmertina">Diana Smertina</a>
          <p>2023</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
