import styles from './index.module.css';

const PageTitle = ({ children }) => {
  return <h2 className={styles.title}>{children}</h2>;
};

export default PageTitle;
