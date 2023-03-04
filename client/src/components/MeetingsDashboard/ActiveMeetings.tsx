import { Meeting } from "../../types";

interface Props {
  meetings: Meeting[];
}

const ActiveMeetings = ({ meetings }: Props) => {
  return <h1>Active meetings</h1>
}

export default ActiveMeetings;