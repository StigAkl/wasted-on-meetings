import { Meeting } from "../../types";
import { H2 } from "../Typography";
import styles from './ActiveMeetings.module.css';

interface Props {
  meetings: Meeting[];
}

const ActiveMeetings = ({ meetings }: Props) => {


  return (
    <article className={styles.container}>
      <H2 variant='gradient'>Active meetings</H2>

      {meetings.length === 0 && <p>No active meetings</p>}
    </article>
  )
}

export default ActiveMeetings;