import { ReactNode } from 'react';
import styles from './Container.module.css';

interface Props {
  children: ReactNode;
}
const Container = ({ children }: Props) => {
  return (
    <article className={styles.container}>
      {children}
    </article>
  )
}

export default Container;