import { ReactNode, FC, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'gradient'
  size?: 's' | 'm' | 'l'
  children: ReactNode
  loading?: boolean
}

const Button: FC<ButtonProps> = ({ variant = 'primary', size, loading, ...props }) => {

  let buttonSize = styles.medium;
  if (size === 's') {
    buttonSize = styles.small;
  }
  else if (size === 'l') buttonSize = styles.large;

  let variantClass = styles.primaryButton;

  if (variant === 'gradient') {
    variantClass = styles.gradientButton;
  } else if (variant === 'secondary') {
    variantClass = styles.secondaryButton;
  }

  return (
    <>
      <button {...props} className={`${variantClass} ${styles.button} ${buttonSize}`}>
        {loading ? "Loading.." : props.children}
      </button>
    </>)
}

export default Button;