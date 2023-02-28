import { ReactNode, FC, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
  size?: 's' | 'm' | 'l'
  children: ReactNode
}

const Button: FC<ButtonProps> = ({ variant = 'primary', size, ...props }) => {

  let buttonSize = styles.medium;
  if (size === 's') {
    buttonSize = styles.small;
  }
  else if (size === 'l') buttonSize = styles.large;


  const variantClass = variant === 'primary' ?
    styles.primaryButton : styles.secondaryButton;

  return (
    <>
      <button {...props} className={`${variantClass} ${styles.button} ${buttonSize}`}>
        {props.children}
      </button>
    </>)
}

export default Button;