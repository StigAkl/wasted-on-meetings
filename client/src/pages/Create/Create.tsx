import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import styles from './Create.module.css';
import { getRoundedTime, getRounderTimeOneHourLater } from "../../utils/helpers";
import { createMeetingUrl } from "../../constants/api";
import useRequest from "../../hooks/useRequest";
import { Meeting } from '../../types';

interface FormData {
  startTime: Date;
  endTime: Date;
  participants: number;
  hourlyRate: number;
}

interface Meetings {
  meetings: Meeting[]
}

const initialFormState: FormData = {
  startTime: getRoundedTime(),
  endTime: getRounderTimeOneHourLater(),
  participants: 5,
  hourlyRate: 300
}

const Create = () => {
  const [form, setForm] = useState<FormData>(initialFormState)
  const [success, setSuccess] = useState(false);
  const { data, error, loading, performRequest } = useRequest<Meetings>(createMeetingUrl);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.startTime.setSeconds(0, 0);
    form.endTime.setSeconds(0, 0);

    await performRequest('POST', JSON.stringify(form));
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <Container>
      <h2 className={styles.title}>Meeting details</h2>
      <form className={styles.createForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Start time:</label>
          <input className={styles.input}
            value={form.startTime.toISOString().slice(0, 16)}
            type="datetime-local"
            name="startDate"
            onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>End time:</label>
          <input className={styles.input} type="datetime-local"
            value={form.endTime.toISOString().slice(0, 16)}
            onChange={handleChange}
            name="endDate"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Participants:</label>
          <input className={styles.input} type="number" value={form.participants}
            onChange={handleChange}
            name="participants"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Hourly rate:</label>
          <input className={styles.input} type="text" value={form.hourlyRate}
            onChange={handleChange}
            name="hourlyRate"
          />
        </div>

        <div className={styles.createButton}>
          {loading ? "Loading.. " : (<Button variant="primary" size="l">Create</Button>)}
        </div>
      </form>
    </Container>
  )
}

export default Create;