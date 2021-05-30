const getRandomValue = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getRandomArbitrary(min, max, simbols) {
  return (Math.random() * (max - min + 1) + min).toFixed(simbols);
}

