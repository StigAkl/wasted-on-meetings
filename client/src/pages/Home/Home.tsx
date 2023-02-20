import styles from './Home.module.css';
import useRequest from '../../hooks/useRequest';
import Button from '../../components/Button/Button';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

interface Meeting {
  id: number;
  owner: number;
  startTime: Date;
  endTime: Date;
  participants: number;
}

interface Meetings {
  meetings: Meeting[]
}

const Home = () => {

  const { data, error, loading } = useRequest<Meetings>("http://localhost:5000/api/v1/meeting");
  const navigate = useNavigate();

  const active = data?.meetings.filter(m =>
    new Date(m.startTime) <= new Date() &&
    new Date(m.endTime) >= new Date());

  const handleOnclick = () => {
    navigate("/create")
  }

  if (loading) return <h3>Loading..</h3>
  /* TODO: Merge class names in Button component (Ask chatgpt how :-) */
  return (
    <section className={styles.container}>
      {!active?.length && <h3>Du er ikke i noen møter</h3>}
      <article className={styles.buttonSpacing}>
        <Button size='l' onClick={handleOnclick} className={styles.styledButton} variant='primary'>
          New meeting
        </Button>
      </article>
    </section>
  )
}

export default Home;