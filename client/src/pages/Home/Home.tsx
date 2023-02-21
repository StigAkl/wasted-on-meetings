import styles from './Home.module.css';
import useRequest from '../../hooks/useRequest';
import Button from '../../components/Button/Button';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Meeting } from '../../types';
import ActiveMeetingCard from '../../components/ActiveMeetingCard/ActiveMeetingCard';

interface Meetings {
  meetings: Meeting[]
}

const Home = () => {

  const { data, error, loading } = useRequest<Meetings>("http://localhost:5000/api/v1/meeting");
  const navigate = useNavigate();

  // const active = data?.meetings.filter(m =>
  //   new Date(m.startTime) <= new Date() &&
  //   new Date(m.endTime) >= new Date());

  const active = [1];

  const handleOnclick = () => {
    navigate("/create")
  }

  if (loading) return <h3>Loading..</h3>
  /* TODO: Merge class names in Button component (Ask chatgpt how :-)) */
  return (
    <section className={styles.container}>
      {!active?.length && (
        <article className={styles.description}>
          With our app, you can easily register the costs for your meetings and get a detailed overview of expenses.
          By having full control over costs, you can identify areas for savings and reduce expenses for future meetings.
        </article>
      )}
      {active?.length && <ActiveMeetingCard />}
      <article className={styles.buttonSpacing}>
        <Button size='l' onClick={handleOnclick} className={styles.styledButton} variant='primary'>
          New meeting
        </Button>
      </article>
    </section>
  )
}

export default Home;