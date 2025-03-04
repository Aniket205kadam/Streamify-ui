export function useConvertTime(localDateTimeString) {
  if (!localDateTimeString.endsWith("Z")) {
    localDateTimeString = localDateTimeString + "Z";
  }

  const date = new Date(localDateTimeString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  if (weeks < 4) return `W${weeks}`;
  if (months < 12) return `${months}mo`;
  
  return `${years}y`;
}
