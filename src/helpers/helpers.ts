export const getLocalTime = (time: number, timezone: number): string => {
  const localTime = new Date((time + timezone) * 1000);
  const getHours = localTime.getUTCHours();
  const getMinutes = localTime.getUTCMinutes();

  return `${getHours}:${getMinutes}`;
};

export const getLocalDate = (time: number, timezone: number): string => {
  const localDate = new Date((time + timezone) * 1000);
  const getYear = localDate.getUTCFullYear();
  const getMonth = localDate.getUTCMonth() + 1;
  const getDay = localDate.getUTCDate();

  return `${getYear}-${getMonth}-${getDay}`;
};

export const getTemperature = (temp: number): number => Math.round(temp);
