export const getRoundedTime = () => {
  const now = new Date();
  const roundedMinutes = Math.round(now.getMinutes() / 5) * 5;
  now.setMinutes(roundedMinutes);

  return now;
};

export const getRounderTimeOneHourLater = () => {
  const time = getRoundedTime();
  time.setHours(time.getHours() + 1);
  return time;
};
