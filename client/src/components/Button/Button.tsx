import { ReactNode, FC, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
  children: ReactNode
}

const Button: FC<ButtonProps> = ({ variant = 'primary', ...props }) => {

  const variantClass = variant === 'primary' ? styles.primaryButton : styles.secondaryButton;
  return (
    <>
      <button {...props} className={`${variantClass} ${styles.button}`}>
        {props.children}
      </button>
    </>)
}

export default Button;