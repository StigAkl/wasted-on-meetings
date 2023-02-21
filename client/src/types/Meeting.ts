export type Meeting = {
  id: number;
  owner: number;
  startTime: Date;
  endTime: Date;
  participants: number;
  hourlyRate: number;
};

export default Meeting;
