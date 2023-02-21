import { Meeting } from "../../types";
import styles from './ActiveMeetingCard.module.css';

const mock: Meeting = {
  id: 10,
  startTime: new Date("Tue Feb 21 2023 22:00:43"),
  endTime: new Date("Tue Feb 22 2023 02:59"),
  owner: 2,
  participants: 10,
  hourlyRate: 300
}

const ActiveMeetingCard = () => {

  const durationInMinutes = (mock.endTime.getTime() - mock.startTime.getTime()) / 1000 / 60;
  const totalCost = (durationInMinutes / 60) * mock.hourlyRate;
  const remainingTimeInMinutes = (mock.endTime.getTime() - new Date().getTime()) / 1000 / 60;
  const progress = (1 - remainingTimeInMinutes / durationInMinutes) * 100;

  return (
    <article className={styles.card}>
      <span className={styles.cardTitle}>Current Meeting</span>
      <div className={styles.participants}>
        Participants: {mock.participants}
      </div>
      <div className={styles.cost}>Total cost: ${totalCost.toFixed(2)}</div>
      <div className={styles.progressBar}>
        <div className={styles.progress} style={{ width: `${progress}%` }}>
          <span className={styles.percent}>{progress.toFixed(0)}%</span>
        </div>
      </div>
      <div className={styles.timeWrapper}>
        <span>{mock.startTime.toLocaleTimeString().slice(0, 5)}</span>
        <span>{mock.endTime.toLocaleTimeString().slice(0, 5)}</span>
      </div>
    </article>
  );
}

export default ActiveMeetingCard;