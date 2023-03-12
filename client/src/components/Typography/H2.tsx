import { ReactNode } from 'react';
import styles from './Typography.module.css';
import classNames from 'classnames';

interface Props {
  variant?: 'default' | 'gradient';
  children: ReactNode;
}

const H2 = ({ variant, children }: Props) => {
  const classes = classNames({ [styles.pinkLight]: variant === 'gradient' });

  return (
    <h2 className={classes}>
      {children}
    </h2>
  )
}

export default H2;