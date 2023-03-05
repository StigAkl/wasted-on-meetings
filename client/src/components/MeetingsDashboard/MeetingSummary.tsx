import { CalendarIcon } from '../Icons/CalendarIcon';
import { ClockIcon } from '../Icons/ClockIcon';
import { MoneyBagIcon } from '../Icons/MoneyBagIcon';
import { Summary } from './MeetingsDashboard';
import styles from './MeetingSummary.module.css';

interface Props {
  summary: Summary;
}

const formatter = new Intl.NumberFormat('no-NO', {
  style: 'currency',
  currency: 'NOK'
});

const MeetingSummary = ({ summary }: Props) => {
  return (
    <>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <span className={styles.cardTitle}>No. meetings</span>
          <span className={styles.data}>
            {summary.meetings}
          </span>
          <div className={styles.icon}>
            <CalendarIcon />
          </div>
        </div>
        <div className={styles.card}>
          <span className={styles.cardTitle}>Total Hours</span>
          <span className={styles.data}>
            {summary.hours.toFixed(1)}
          </span>
          <div className={styles.icon}>
            <ClockIcon />
          </div>
        </div>
        <div className={styles.card}>
          <span className={styles.cardTitle}>Total Cost</span>
          <span className={styles.data}>{formatter.format(summary.cost)}</span>
          <div className={styles.icon}>
            <MoneyBagIcon />
          </div>
        </div>
      </div>

      <div className={styles.dividingLine}></div>
    </>
  )
}

export default MeetingSummary;