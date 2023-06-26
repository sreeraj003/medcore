const today = new Date();
const date =
  today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
const time = today.getHours() + ":" + today.getMinutes();
const dateTime = date + " " + time;

module.exports = {
  dateTime,
};
