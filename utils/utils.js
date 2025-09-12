export function getRandomNum(max) {
  return Math.floor(Math.random() * max);
}

export function getQ(str) {
  return document.querySelector(`${str}`);
}
