import { ReactNode } from 'react';
import styles from './DataCard.module.css';

interface Props {
  icon: JSX.Element;
  data: string;
  title: string;
}

const DataCard = ({ icon, data, title }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        {icon}
      </div>
      <span className={styles.data}>
        {data}
      </span>
      <span className={styles.cardTitle}>{title}</span>
    </div>
  )
}

interface DataCardContainerProps {
  children: ReactNode;
}

const DataCardContainer = ({ children }: DataCardContainerProps) => {
  return (
    <article className={styles.cardContainer}>
      {children}
    </article>
  )
}

DataCard.Container = DataCardContainer;

export default DataCard;