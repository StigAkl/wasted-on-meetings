import { CalendarIcon } from '../Icons/CalendarIcon';
import { ClockIcon } from '../Icons/ClockIcon';
import { MoneyBagIcon } from '../Icons/MoneyBagIcon';
import { H2 } from '../Typography';
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
      <H2 variant='gradient'>Meeting Summary</H2>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.icon}>
            <CalendarIcon />
          </div>
          <span className={styles.data}>
            {summary.meetings}
          </span>
          <span className={styles.cardTitle}>Meetings</span>
        </div>
        <div className={styles.card}>
          <div className={styles.icon}>
            <ClockIcon />
          </div>
          <span className={styles.data}>
            {summary.hours.toFixed(1)}
          </span>
          <span className={styles.cardTitle}>Hours spent</span>

        </div>
        <div className={styles.card}>
          <div className={styles.icon}>
            <MoneyBagIcon />
          </div>
          <span className={styles.data}>{formatter.format(summary.cost)}</span>
          <span className={styles.cardTitle}>Total Cost</span>
        </div>
      </div>

      <div className={styles.dividingLine}></div>
    </>
  )
}

export default MeetingSummary;