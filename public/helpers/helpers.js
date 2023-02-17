export const getLocalTime = (time, timezone = 0) => {
    const localTime = new Date((time + timezone) * 1000);
    let getHours = localTime.getUTCHours();
    let getMinutes = localTime.getUTCMinutes();
    getHours = getHours < 10 ? '0' + getHours : getHours;
    getMinutes = getMinutes < 10 ? '0' + getMinutes : getMinutes;
    return `${getHours}:${getMinutes}`;
};
export const getTemperature = (temp) => Math.round(temp);
