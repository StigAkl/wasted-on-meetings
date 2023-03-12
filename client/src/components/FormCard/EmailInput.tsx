import { ChangeEvent } from 'react';
import css from './FormCard.module.css';

interface Props {
  error?: boolean;
  onChange: (() => void) | ((event: ChangeEvent<HTMLInputElement>) => void);
}

const EmailInput = ({ error, onChange }: Props) => {

  const className = error ? css.errorBorder : '';

  return (
    <input className={className} placeholder="Email" type="email" name="email" onChange={onChange} />
  )
}

export default EmailInput;