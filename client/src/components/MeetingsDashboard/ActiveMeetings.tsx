import { Meeting } from "../../types";
import { getRounderTimeOneHourLater } from "../../utils/dateTimeHelpers";
import ActiveMeetingCard from "../ActiveMeetingCard/ActiveMeetingCard";
import Button from "../Button/Button";
import { H2 } from "../Typography";
import styles from './ActiveMeetings.module.css';
import { useNavigate } from "react-router-dom";
interface Props {
  meetings: Meeting[];
}

const ActiveMeetings = ({ meetings }: Props) => {

  const navigate = useNavigate();

  const meeting: Meeting = {
    endTime: getRounderTimeOneHourLater(),
    startTime: new Date(),
    hourlyRate: 300,
    owner: 12,
    id: 2,
    participants: 10
  };

  meetings.push(meeting);

  return (
    <article className={styles.container}>
      <H2 variant='gradient'>Active meetings</H2>

      {meetings.length === 0 && (
        <>
          <p>No active meetings</p>
        </>
      )}

      <ActiveMeetingCard meeting={meeting} />
      <Button onClick={() => navigate("/create")}>New meeting</Button>
    </article>
  )
}

export default ActiveMeetings;