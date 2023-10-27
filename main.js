// clock
const clockEl = document.getElementById("clock");
const clockFrame = document.getElementById("frame");
const clockBase = document.getElementById("base");
const hourEl = document.getElementById("center-hour");
const hourArm = document.getElementById("hour");
const minEl = document.getElementById("center-min");
const minArm = document.getElementById("min");
const secEl = document.getElementById("center-sec");
const secArm = document.getElementById("sec");

// buttons
let soundOn = false;
const soundButton = document.getElementById("sound");
soundButton.textContent = "sound ON";
soundButton.addEventListener("click", () => {
  soundOn = !soundOn;
  if (soundOn) {
    soundButton.textContent = "sound OFF";
  } else {
    soundButton.textContent = "sound ON";
  }
});

// audio
const tick = new Audio("tick.m4a");
const tock = new Audio("tock.m4a");
const currentSec = 0;

let lastUpdate = 0;
let lastSecond;
function clock() {
  const updateClock = (timeStamp) => {
    let updateRate = Math.random() * (1500 - 200) + 200;
    if (timeStamp - lastUpdate > updateRate) {
      // current time
      const now = new Date();
      const hour = now.getHours() % 12;
      const min = now.getMinutes();
      let sec = now.getSeconds();
      // increment too early
      if (updateRate > 1000) {
        sec += 1;
      }

      // clock arm positions
      const hourDeg = calcRad(hour, 12);
      const minDeg = calcRad(min, 60);
      const secDeg = calcRad(sec, 60);

      const isRandomlySkipped = randomNumber(6) === 5;
      if (!isRandomlySkipped) {
        hourEl.style.rotate = hourDeg;
        //console.log({ hour, hourDeg });
        minEl.style.rotate = minDeg;
        //console.log({ min, minDeg });
        secEl.style.rotate = secDeg;
        //console.log({ sec, secDeg });

        // tick-tock sound if sound turned on and we have actually advanced compared to the last one
        if (lastSecond != sec) {
          const elapsed = (cur, last) =>
            `${cur}: ${Math.floor(
              timeStamp - lastUpdate
            )}ms elapsed since last ${last}`;
          if (sec % 2 === 0) {
            if (soundOn) tick.play();
            console.log(elapsed("tick", "tock"));
          } else {
            if (soundOn) tock.play();
            console.log(elapsed("tock", "tick"));
          }
          lastSecond = sec;
          lastUpdate = timeStamp;
        }
      } else {
        console.log("skipped a seconnd beat");
      }
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

function randomNumber(max) {
  return Math.floor(Math.random() * max);
}
