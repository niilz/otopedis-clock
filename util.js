export function calcRad(timeVal, maxTimeVal) {
  const deg = timeVal * (360 / maxTimeVal);
  return deg.toString() + "deg";
}

export function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

export function vmin(percent) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const min = Math.min(width, height);
  return (min * percent) / 100;
}
