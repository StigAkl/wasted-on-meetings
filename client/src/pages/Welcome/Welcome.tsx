import { Link } from 'react-router-dom';
import styles from './Welcome.module.css';

const Welcome = () => {
  return (
    <section className={styles.section}>
      <div className={styles.hero}>
        <h1>Welcome to Meeting Costs Tracker</h1>
        <p>Track your meeting expences and save money!</p>
        <Link to="/signup" className={styles.cta}>Sign up for free!</Link>
      </div>
    </section>)
}

export default Welcome;