import { ReactNode } from 'react';
import styles from './Container.module.css';

interface Props {
  children: ReactNode;
  variant?: 'gradient' | 'default';
}

const Container = ({ children, variant }: Props) => {
  const className = variant === 'gradient' ?
    styles.gradientContainer :
    styles.container;

  return (
    <article className={className}>
      {children}
    </article>
  )
}

export default Container;