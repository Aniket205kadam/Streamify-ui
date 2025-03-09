import React from "react";
import { formatDistanceToNow } from "date-fns";

function TimeConverter({ timestamp }) {
  const formattedTime = formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
  }).replace("about", "").replace("less than a", "");
  return <span>{formattedTime}</span>;
}

export default TimeConverter;
