export const getLocalTime = (time, timezone) => {
    const localTime = new Date((time + timezone) * 1000);
    const getHours = localTime.getUTCHours();
    const getMinutes = localTime.getUTCMinutes();
    return `${getHours}:${getMinutes}`;
};
export const getTemperature = (temp) => Math.round(temp);
