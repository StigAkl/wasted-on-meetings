import DataCard from '@wom/DataCard/DataCard';
import { CalendarIcon } from '@wom/Icons/CalendarIcon';
import { ClockIcon } from '@wom/Icons/ClockIcon';
import { MoneyBagIcon } from '@wom/Icons/MoneyBagIcon';
import { H2 } from '../Typography';
import { Summary } from './MeetingsDashboard';
import styles from './MeetingSummary.module.css';

interface Props {
  summary: Summary;
}

const formatter = new Intl.NumberFormat('no-NO', {
  style: 'currency',
  currency: 'NOK'
});

const MeetingSummary = ({ summary }: Props) => {

  const cost = formatter.format(summary.cost);
  const hours = summary.hours.toFixed(1);
  const meetings = summary.meetings.toString()

  return (
    <section className={styles.summaryContainer}>
      <div className={styles.dividingLine}></div>
      <H2 variant='gradient'>Meeting Summary</H2>
      <DataCard.Container>
        <DataCard title="Meetings" data={meetings} icon={<CalendarIcon />} />
        <DataCard title="Hours spent" data={hours} icon={<ClockIcon />} />
        <DataCard title="Total Cost" data={cost} icon={<MoneyBagIcon />} />
      </DataCard.Container>
    </section>
  )
}

export default MeetingSummary;