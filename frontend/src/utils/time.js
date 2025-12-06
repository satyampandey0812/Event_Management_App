import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const toUTCISO = (dateStr, timeStr, tz) =>
  dayjs.tz(`${dateStr} ${timeStr}`, "YYYY-MM-DD HH:mm", tz).utc().toISOString();

export const formatInTZ = (value, tz) =>
  dayjs.utc(value).tz(tz).format("MMM DD, YYYY hh:mm A");

export default dayjs;
