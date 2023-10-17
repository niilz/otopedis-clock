const clockEl = document.getElementById("clock");
const clockFrame = document.getElementById("frame");
const clockBase = document.getElementById("base");
const hourEl = document.getElementById("center-hour");
const hourArm = document.getElementById("hour");
const minEl = document.getElementById("center-min");
const minArm = document.getElementById("min");
const secEl = document.getElementById("center-sec");
const secArm = document.getElementById("sec");

let lastUpdate = 0;

function clock() {
  const updateClock = (timeStamp) => {
    if (timeStamp - lastUpdate > 1000) {
      const now = new Date();
      const hour = now.getHours() % 12;
      const min = now.getMinutes();
      const sec = now.getSeconds();

      const hourDeg = calcRad(hour, 12);
      console.log({ hour, hourDeg });
      hourEl.style.rotate = hourDeg;

      const minDeg = calcRad(min, 60);
      console.log({ min, minDeg });
      minEl.style.rotate = minDeg;

      const secDeg = calcRad(sec, 60);
      console.log({ sec, secDeg });
      secEl.style.rotate = secDeg;

      lastUpdate = timeStamp;
    }
    requestAnimationFrame(updateClock);
  };

  requestAnimationFrame(updateClock);
}

clock();

function calcRad(timeVal, maxTimeVal) {
  const deg = timeVal * (360 / maxTimeVal);
  return deg.toString() + "deg";
}
