const clockEl = document.getElementById("clock");
const hourEl = document.getElementById("hour");
const minEl = document.getElementById("min");
const secEl = document.getElementById("sec");

function clock() {
  const now = new Date();
  const hour = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();

  hourEl.textContent = hour;
  minEl.textContent = min;
  secEl.textContent = sec;
}

clock();
