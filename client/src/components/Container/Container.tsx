import { ReactNode } from 'react';
import styles from './Container.module.css';

type Variant = 'gradient' | 'default' | 'gradient-login'

interface Props {
  children: ReactNode;
  variant?: Variant;
}

const Container = ({ children, variant }: Props) => {
  const className = getClass(variant);

  return (
    <article className={className}>
      {children}
    </article>
  )
}

const getClass = (variant: Variant | undefined) => {
  if (!variant) return styles.container;
  if (variant === 'gradient') return styles.gradientContainer;
  if (variant === 'gradient-login') return styles.gradientContainerLogin;
  return styles.container;
}
export default Container;