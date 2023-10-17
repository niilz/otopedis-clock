const clockEl = document.getElementById("clock");
const hourEl = document.getElementById("hour");
const minEl = document.getElementById("min");
const secEl = document.getElementById("sec");

let lastUpdate = 0;

function clock() {
  const updateClock = (timeStamp) => {
    if (timeStamp - lastUpdate > 1000) {
      const now = new Date();
      const hour = now.getHours();
      const min = now.getMinutes();
      const sec = now.getSeconds();

      hourEl.textContent = hour;
      minEl.textContent = min;
      secEl.textContent = sec;

      lastUpdate = timeStamp;
    }
    requestAnimationFrame(updateClock);
  };

  requestAnimationFrame(updateClock);
}

clock();
