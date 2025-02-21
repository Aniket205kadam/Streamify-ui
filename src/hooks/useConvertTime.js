export function useConvertTime(localDateTimeString) {
  if (!localDateTimeString.endsWith("Z"))
    localDateTimeString = localDateTimeString + "Z";
  const date = new Date(localDateTimeString);
  const now = new Date();
  const second = Math.floor((now - date) / 1000);
  const minutes = Math.floor(second / 60);
  const hours = Math.floor(minutes / 60);
  const day = Math.floor(hours / 24);
  const months = Math.floor(day / 30);
  const year = Math.floor(months / 12);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  if (second < 60) return rtf.format(-second, "second");
  if (minutes < 60) return rtf.format(-minutes, "minute");
  if (hours < 24) return rtf.format(-hours, "hour");
  if (day < 30) return rtf.format(-day, "day");
  if (months < 12) return rtf.format(-months, "month");
  else rtf.format(-year, "year");
}
