import { Meeting } from "../../types";
import styles from './ActiveMeetingCard.module.css';
import People from './../../assets/people.svg';
import Money from './../../assets/money.svg';
import Clock from './../../assets/clock.svg';

const mock: Meeting = {
  id: 10,
  startTime: new Date("Tue Feb 21 2023 22:00:43"),
  endTime: new Date("Tue Feb 22 2023 02:59"),
  owner: 2,
  participants: 10,
  hourlyRate: 300
}

interface Props {
  meeting: Meeting;
}

const ActiveMeetingCard = ({ meeting }: Props) => {

  const durationInMinutes = (meeting.endTime.getTime() - meeting.startTime.getTime()) / 1000 / 60;
  const totalCost = (durationInMinutes / 60) * meeting.hourlyRate;
  let remainingTimeInMinutes = (meeting.endTime.getTime() - new Date().getTime()) / 1000 / 60;
  let progress = (1 - remainingTimeInMinutes / durationInMinutes) * 100;


  return (
    <article className={styles.card}>
      <div className={styles.statistics}>
        <div className={styles.data}>
          <img src={People} style={{ height: 25, width: 25 }} alt="People icon" />
          <span>Participants: {meeting.participants}</span>
        </div>

        <div className={styles.data}>
          <img src={Money} style={{ height: 25, width: 25 }} alt="Money icon" />
          Costs: {totalCost.toFixed(2)}
        </div>
      </div>
      Remaining
      <div className={styles.progressBar}>
        <div className={styles.progress} style={{ width: `${80}%` }}>
          <span className={styles.percent}>{progress.toFixed(0)}%</span>
        </div>
      </div>
      <div className={styles.timeWrapper}>
        <span>{meeting.startTime.toLocaleTimeString().slice(0, 5)}</span>
        <img src={Clock} style={{ height: 25, width: 25 }} alt="Clock icon" />
        <span>{meeting.endTime.toLocaleTimeString().slice(0, 5)}</span>
      </div>
    </article>
  );
}

export default ActiveMeetingCard;