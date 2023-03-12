import { Meeting } from "../../types";
import styles from './MeetingsDashboard.module.css';

interface Props {
  meetings: Meeting[];
}

const PreviousMeetings = ({ meetings }: Props) => {

  const renderMeetings = meetings.map(m => {
    return (
      <div className={styles.row}>
        <div className={styles.cell}>{m.startTime.toDateString()}</div>
        <div className={`${styles.cell} ${styles.center}`}>{m.participants}</div>
        <div className={`${styles.cell} ${styles.center}`}>120</div>
        <div className={`${styles.cell} ${styles.center}`}>3500</div>
      </div>
    )
  })

  return <>
    <div className={styles.table}>
      <div className={`${styles.row} ${styles.header}`}>
        <div className={styles.cell}>Date</div>
        <div className={`${styles.cell} ${styles.center}`}>Participants</div>
        <div className={`${styles.cell} ${styles.center}`}>Duration</div>
        <div className={styles.cell}>Cost</div>
      </div>
    </div>
    {renderMeetings}
  </>
}

export default PreviousMeetings;