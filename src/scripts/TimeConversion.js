function getTimeAgo(start, now) {
  const seconds = now - start;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  let resultStr = "";

  if (weeks > 4) {
    resultStr = Date(seconds * 1000).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } else if (weeks > 1) {
    resultStr = weeks + " WEEKS AGO";
  } else if (weeks === 1) {
    resultStr = weeks + " WEEK AGO";
  } else if (days > 1) {
    resultStr = days + " DAYS AGO";
  } else if (days === 1) {
    resultStr = days + " DAY AGO";
  } else if (hours > 1) {
    resultStr = hours + " HOURS AGO";
  } else if (hours === 1) {
    resultStr = hours + " HOUR AGO";
  } else if (minutes > 1) {
    resultStr = minutes + " MINUTES AGO";
  } else if (minutes === 1) {
    resultStr = minutes + " MINUTE AGO";
  } else {
    resultStr = "JUST NOW";
  }

  return resultStr;
}

export default getTimeAgo;
