var Weekdays;
(function (Weekdays) {
    Weekdays[Weekdays["Sunday"] = 0] = "Sunday";
    Weekdays[Weekdays["Monday"] = 1] = "Monday";
    Weekdays[Weekdays["Tuesday"] = 2] = "Tuesday";
    Weekdays[Weekdays["Wednesday"] = 3] = "Wednesday";
    Weekdays[Weekdays["Thursday"] = 4] = "Thursday";
    Weekdays[Weekdays["Friday"] = 5] = "Friday";
    Weekdays[Weekdays["Saturday"] = 6] = "Saturday";
})(Weekdays || (Weekdays = {}));
export const getLocalTime = (time, timezone) => {
    const localTime = new Date((time + timezone) * 1000);
    let getHours = localTime.getUTCHours();
    let getMinutes = localTime.getUTCMinutes();
    getHours = getHours < 10 ? '0' + getHours : getHours;
    getMinutes = getMinutes < 10 ? '0' + getMinutes : getMinutes;
    return `${getHours}:${getMinutes}`;
};
export const getLocalDate = (time, timezone) => {
    const localDate = new Date((time + timezone) * 1000);
    const getYear = localDate.getUTCFullYear();
    const getMonth = localDate.getUTCMonth() + 1;
    const getDay = localDate.getUTCDate();
    return `${getYear}-${getMonth}-${getDay}`;
};
export const getLocalDay = (time, timezone) => {
    const localDate = new Date((time + timezone) * 1000);
    const getDay = localDate.getUTCDay();
    return Weekdays[getDay];
};
export const getTemperature = (temp) => Math.round(temp);
