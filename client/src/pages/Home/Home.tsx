import styles from './Home.module.css';
import useRequest from '../../hooks/useRequest';
import Button from '../../components/Button/Button';
import { useNavigate } from "react-router-dom";
import { Meeting } from '../../types';
import ActiveMeetingCard from '../../components/ActiveMeetingCard/ActiveMeetingCard';
import Title from '../../components/Title/Title';

interface Meetings {
  meetings: Meeting[]
}

const Home = () => {

  const { data, error, loading } = useRequest<Meetings>("http://localhost:5000/api/v1/meeting");
  const navigate = useNavigate();

  const handleOnclick = () => {
    navigate("/create")
  }

  const meetings = data?.meetings?.map(m => {
    const meeting = {
      ...m,
      startTime: new Date(m.startTime),
      endTime: new Date(m.endTime)
    };
    return meeting;
  })

  const active = meetings?.filter(m =>
    m.startTime <= new Date() &&
    m.endTime >= new Date());

  const activeMeetings = active?.map(m => {
    return <ActiveMeetingCard meeting={m} />
  });

  const emptyStateContainer = activeMeetings?.length === 0 ?
    styles.emptyStateContainer :
    undefined;


  if (loading) return <h3>Loading..</h3>
  /* TODO: Merge class names in Button component (Ask chatgpt how :-)) */
  return (
    <section className={`${styles.container} ${emptyStateContainer}`}>
      {!active?.length && (
        <article className={styles.description}>
          With our app, you can easily register the costs for your meetings and get a detailed overview of expenses.
          By having full control over costs, you can identify areas for savings and reduce expenses for future meetings.
        </article>
      )}

      {
        activeMeetings?.length !== 0 && (
          <>
            <Title>Active Meetings</Title>
            <div className={styles.activeMeetingsWrapper}>
              {activeMeetings}
            </div>
          </>
        )
      }

      <article className={styles.buttonSpacing}>
        <Button size='l' onClick={handleOnclick} className={styles.styledButton} variant='primary'>
          New meeting
        </Button>
      </article>
    </section >
  )
}

export default Home;