import { Summary } from './MeetingsDashboard';
import styles from './MeetingSummary.module.css';

interface Props {
  summary: Summary;
}

const MeetingSummary = ({ summary }: Props) => {
  return (
    <>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <span className={styles.data}>{summary.meetings}</span> meetings
        </div>
        <div className={styles.card}>
          <span className={styles.data}>
            {summary.hours}
          </span>hours
        </div>
        <div className={styles.card}>

          <span className={styles.data}>{summary.cost}</span> cost
        </div>
      </div>

      <div className={styles.dividingLine}></div>
    </>
  )
}

export default MeetingSummary;