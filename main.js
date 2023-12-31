import { vmin, randomNumber, calcRad } from "./util.js";
import { flag, heading, quote, onOff, footer } from "./i18n.js";

// text elements
let langOptions = {
  dutch: "english",
  english: "dutch",
};
let language = "dutch";
const docTitle = document.querySelector("title");
const h1Heading = document.querySelector("h1");
const footerH2 = document.querySelector("h2");

// clock
const hourEl = document.getElementById("center-hour");
const minEl = document.getElementById("center-min");
const secEl = document.getElementById("center-sec");
const description = document.querySelector("#description");

// buttons
const langIcon = document.querySelector("#language");
langIcon.textContent = "🇬🇧";
langIcon.addEventListener("click", () => {
  language = langOptions[language];
  updateLanguages();
  updateSoundButtonText();
});

updateLanguages();

let soundOn = false;
const soundButton = document.getElementById("sound");
const soundButtonText = (option) => `sound ${onOff[language][option]}`;
soundButton.textContent = soundButtonText("on");
console.log(soundButton.textContent);
soundButton.addEventListener("click", () => {
  updateSoundButtonText();
});

function updateSoundButtonText() {
  soundOn = !soundOn;
  if (soundOn) {
    soundButton.textContent = soundButtonText("off");
  } else {
    soundButton.textContent = soundButtonText("on");
  }
}

function updateLanguages() {
  docTitle.textContent = heading[language];
  h1Heading.textContent = heading[language];
  description.innerHTML = quote[language];
  footerH2.textContent = footer[language];
  langIcon.textContent = flag[language];
}

// canvas
const canvas = document.getElementById("canvas");
let canvasSize = vmin(80);
canvas.width = canvasSize;
canvas.height = canvasSize;
const ctx = canvas.getContext("2d");
window.addEventListener("resize", () => {
  if (vmin(80) !== canvasSize) {
    canvasSize = vmin(80);
    console.log({ canvasSize });
    canvas.height = canvasSize;
    canvas.width = canvasSize;
    drawSecondMarks();
  }
});

drawSecondMarks();

function drawSecondMarks() {
  ctx.fillStyle = "black";
  const secMarkerWidth = vmin(1);
  const secMarkerHeight = vmin(5);
  const halfCanvas = vmin(40);

  ctx.translate(halfCanvas, halfCanvas);
  for (let sec = 1; sec < 61; sec++) {
    ctx.rotate((2 * Math.PI) / 60);
    ctx.fillRect(
      -secMarkerWidth / 2,
      -halfCanvas,
      secMarkerWidth,
      secMarkerHeight
    );
  }
  ctx.restore();
}

// audio
const tick = new Audio("tick.m4a");
const tock = new Audio("tock.m4a");

// clock-update
let lastUpdate = 0;
let lastSecond;
let lastUpdateRate;
let wasLastUpdateRateUsed = true;
const updateRateValues = [1300, 1000, 700];
function clock() {
  const updateClock = (timeStamp) => {
    let updateRate;
    if (wasLastUpdateRateUsed) {
      const updateRateIdx = Math.floor(Math.random() * 3);
      updateRate = updateRateValues[updateRateIdx];
      //console.log({ updateRateIdx, updateRate });
      lastUpdateRate = updateRate;
      wasLastUpdateRateUsed = false;
    } else {
      updateRate = lastUpdateRate;
    }

    if (timeStamp - lastUpdate > updateRate) {
      lastUpdateRate = updateRate;
      wasLastUpdateRateUsed = true;
      // current time
      const now = new Date();
      const hour = now.getHours() % 12;
      const min = now.getMinutes();
      let sec = now.getSeconds();
      // increment too early
      if (updateRate < 1000) {
        //console.log("Incremented preemptively");
        sec += 1;
      }

      // clock arm positions
      const hourDeg = calcRad(hour, 12);
      const minDeg = calcRad(min, 60);
      const secDeg = calcRad(sec, 60);

      const isRandomlySkipped = randomNumber(10) === 9;
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
        }
      } else {
        console.log("skipped a seconnd beat");
      }
      lastUpdate = timeStamp;
    }
    requestAnimationFrame(updateClock);
  };

  requestAnimationFrame(updateClock);
}

clock();
