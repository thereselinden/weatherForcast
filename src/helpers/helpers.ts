enum Weekdays {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export const getLocalTime = (time: number, timezone: number): string => {
  const localTime = new Date((time + timezone) * 1000);

  let getHours: string | number = localTime.getUTCHours();
  let getMinutes: string | number = localTime.getUTCMinutes();

  getHours = getHours < 10 ? '0' + getHours : getHours;
  getMinutes = getMinutes < 10 ? '0' + getMinutes : getMinutes;

  return `${getHours}:${getMinutes}`;
};

export const getLocalDate = (time: number, timezone: number): string => {
  const localDate = new Date((time + timezone) * 1000);
  const getYear = localDate.getUTCFullYear();
  let getMonth: string | number = localDate.getUTCMonth() + 1;
  let getDay: string | number = localDate.getUTCDate();

  getMonth = getMonth < 10 ? '0' + getMonth : getMonth;
  getDay = getDay < 10 ? '0' + getDay : getDay;

  return `${getYear}-${getMonth}-${getDay}`;
};

export const getLocalDay = (time: number, timezone: number): string => {
  const localDate = new Date((time + timezone) * 1000);
  const getDay = localDate.getUTCDay();

  return Weekdays[getDay];
};

export const getTemperature = (temp: number): number => Math.round(temp);
