import { Link } from 'react-router-dom';
import styles from './Welcome.module.css';

const Welcome = () => {
  return (
    <section className={styles.section}>
      <div className={styles.hero}>
        <h1>Welcome to Meeting Costs Tracker</h1>
        <p>Track your meeting expences and save money!</p>
        <Link to="/signup" className={styles.cta}>Sign up!</Link>'

        <article className={styles.loginText}>
          Or <Link className={styles.loginLink} to="/login">Log in</Link> to an existing account
        </article>
      </div>
    </section>)
}

export default Welcome;