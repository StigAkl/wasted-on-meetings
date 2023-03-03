import { ReactNode } from 'react';
import css from './FormCard.module.css';

interface Props {
  children: ReactNode;
  title: string;
}

const FormCard = ({ children, title }: Props) => {
  return (
    <article className={css.formContainer}>
      <h2>{title}</h2>
      {children}
    </article>
  )
}

export default FormCard;