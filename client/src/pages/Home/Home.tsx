import css from './Home.module.css';
import useRequest from '../../hooks/useRequest';

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

  if (loading) return <h3>Loading..</h3>
  return (
    <>
      <h2>Home</h2>
    </>
  )
}

export default Home;