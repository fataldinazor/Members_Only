const dateTime = new Date("2024-09-03T09:17:46.322Z");
const options = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
  
};
const date=(dateTime.toLocaleString("en-GB", options));
const time=(dateTime.toLocaleTimeString("en-GB",{hour12:true, hour:"2-digit", minute:"2-digit"}));
