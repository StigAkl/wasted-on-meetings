import styles from './Home.module.css';
import useRequest from '../../hooks/useRequest';
import { useNavigate } from "react-router-dom";
import { Meeting } from '../../types';
import { useEffect } from 'react';
import { fetchMeetings } from '../../constants/api';
import Container from '../../components/Container/Container';
import MeetingsDashboard from '../../components/MeetingsDashboard/MeetingsDashboard';


interface Meetings {
  meetings: Meeting[]
}

const Home = () => {

  const { data, error, loading, performRequest } = useRequest<Meetings>(fetchMeetings);
  const navigate = useNavigate();

  useEffect(() => {
    performRequest();
  }, []);


  const newMeetingClick = () => {
    navigate("/create")
  }

  const meetings = getMeetings(data);

  if (loading) return <h3>Loading..</h3>

  return (
    <Container variant='gradient'>
      <MeetingsDashboard meetings={meetings} />
    </Container>
  )
}

const getMeetings = (data: Meetings | null) => {
  const meetings = data?.meetings?.map(m => {
    const meeting = {
      ...m,
      startTime: new Date(m.startTime),
      endTime: new Date(m.endTime)
    };
    return meeting;
  })

  if (meetings === undefined || meetings === null) return [];
  return meetings;
}
export default Home;