function getTimeAgo(start, now) {
  const seconds = now - start;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  let resultStr = "";

  if (weeks > 4) {
    resultStr = new Date(start * 1000)
      .toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
      .toLocaleUpperCase();
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

function getTimeAgoShort(start, now) {
  const seconds = now - start;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4.333);
  const years = Math.floor(months / 12);

  let resultStr = "";

  if (years >= 1) {
    resultStr = years + "y";
  } else if (months >= 1) {
    resultStr = months + "mo";
  } else if (weeks >= 1) {
    resultStr = weeks + "w";
  } else if (days >= 1) {
    resultStr = days + "d";
  } else if (hours >= 1) {
    resultStr = hours + "h";
  } else if (minutes >= 1) {
    resultStr = minutes + "min";
  } else {
    resultStr = "just now";
  }

  return resultStr;
}

export { getTimeAgo, getTimeAgoShort };
