import { ReactNode } from "react";
import { Link } from "react-router-dom"
import styles from './CTALink.module.css';

interface Props {
  to: string;
  children: ReactNode;
}

const CTALink = ({ to, children }: Props) => {
  return <Link to={to} className={styles.cta}>{children}</Link>
}

export default CTALink;