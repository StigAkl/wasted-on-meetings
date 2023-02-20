import styles from './Home.module.css';
import useRequest from '../../hooks/useRequest';
import Button from '../../components/Button/Button';

interface Meeting {
  id: number;
  owner: number;
  startTime: Date;
  endTime: Date;
  participants: number;
}

interface Meetings {
  meeings: Meeting[]
}

const Home = () => {

  const [data, error, loading] = useRequest<Meetings>("http://localhost:5000/api/v1/meeting");

  const handleOnclick = () => {
    console.log("clicked")
  }
  if (loading) return <h3>Loading..</h3>
  /* TODO: Merge class names in Button component (Ask chatgpt how :-) */
  return (
    <section className={styles.container}>
      <Button onClick={handleOnclick} className={styles.styledButton} variant='primary'>
        Start new meeting
      </Button>
    </section>
  )
}

export default Home;