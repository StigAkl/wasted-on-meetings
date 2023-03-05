import { Link } from 'react-router-dom';
import Container from '../../components/Container/Container';
import CTALink from '../../components/CTALink/CTALink';
import styles from './Welcome.module.css';

//<section className={styles.container}>
const Welcome = () => {
  return (
    <Container variant='gradient'>
      <section className={styles.container}>
        <h1>Welcome to Meeting Costs Tracker</h1>
        <p>Track your meeting expences and save money!</p>
        <CTALink to="/signup">Sign up!</CTALink>
        <article className={styles.loginText}>
          Or <Link className={styles.loginLink} to="/login">Log in</Link> to an existing account
        </article>
      </section>
    </Container>)
}

export default Welcome;