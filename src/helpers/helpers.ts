export const getLocalTime = (time: number, timezone: number = 0): string => {
  const localTime = new Date((time + timezone) * 1000);

  let getHours: string | number = localTime.getUTCHours();
  let getMinutes: string | number = localTime.getUTCMinutes();

  getHours = getHours < 10 ? '0' + getHours : getHours;
  getMinutes = getMinutes < 10 ? '0' + getMinutes : getMinutes;

  return `${getHours}:${getMinutes}`;
};

export const getTemperature = (temp: number): number => Math.round(temp);
