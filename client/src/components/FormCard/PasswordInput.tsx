import { ChangeEvent } from 'react';
import css from './FormCard.module.css';

interface Props {
  error?: boolean;
  onChange: (() => void) | ((event: ChangeEvent<HTMLInputElement>) => void);
}

const PasswordInput = ({ error, onChange }: Props) => {
  const className = error ? css.errorBorder : '';

  return (
    <input className={className} type="password" name="password" onChange={onChange} />
  )
}

export default PasswordInput;