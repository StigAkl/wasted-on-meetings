import classNames from 'classnames';
import { ReactNode } from 'react';
import styles from './Container.module.css';

type JustifyContent = 'center' | 'start';
interface Props {
  children: ReactNode;
  justifyContent?: string;
}

const Container = ({ children, justifyContent }: Props) => {

  const containerClass = classNames(styles.container, {
    [styles.center]: justifyContent === 'center',
    [styles.start]: justifyContent === 'start'
  });

  return (
    <article className={containerClass}>
      {children}
    </article>
  )
}

export default Container;