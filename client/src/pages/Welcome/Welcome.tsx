import { Link } from 'react-router-dom';
import styles from './Welcome.module.css';

const Welcome = () => {
  return (
    <section>
      <div className={styles.hero}>
        <h1>Welcome to Meeting Costs Tracker</h1>
        <p>Track your meeting expences and save money!</p>
        <Link to="#" className={styles.cta}>Coming soon!</Link>
      </div>
    </section>)
}

export default Welcome;