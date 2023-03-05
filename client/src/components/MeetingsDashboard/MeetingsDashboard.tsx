import { Meeting } from '../../types';
import { activeMeetingsFilter, calculateMeetingdurationInHours, previousMeetingsFilter } from '../../utils/filters';
import styles from './MeetingsDashboard.module.css';
import MeetingSummary from './MeetingSummary';

interface Props {
  meetings: Meeting[];
}

export interface Summary {
  meetings: number;
  hours: number;
  cost: number;
}

const MeetingsDashboard = ({ meetings }: Props) => {

  const activeMeetings = meetings.filter(activeMeetingsFilter);
  const previousMeetings = meetings.filter(previousMeetingsFilter);

  const totalMeetingHours = previousMeetings.reduce((acc, cur) => {
    const meetingDuration = calculateMeetingdurationInHours(cur);
    return acc + meetingDuration;
  }, 0);

  const totalCost = previousMeetings.reduce((acc, cur) => {
    const meetingDuration = calculateMeetingdurationInHours(cur);
    return acc + (meetingDuration * cur.hourlyRate * cur.participants);
  }, 0);

  const summary = {
    meetings: meetings.length,
    hours: totalMeetingHours,
    cost: totalCost
  }

  return (
    <section className={styles.container}>
      <h2>Meeting Summary</h2>
      <MeetingSummary summary={summary} />
    </section>
  )
}

export default MeetingsDashboard;