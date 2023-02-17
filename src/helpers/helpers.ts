export const getLocalTime = (time: number, timezone: number = 0): string => {
  const localTime = new Date((time + timezone) * 1000);
  const getHours = localTime.getUTCHours();
  const getMinutes = localTime.getUTCMinutes();

  return `${getHours}:${getMinutes}`;
};

export const getTemperature = (temp: number): number => Math.round(temp);
