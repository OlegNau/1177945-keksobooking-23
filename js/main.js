const getRandomInteger = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomInteger();

const getRandomFractionNumber = function (min, max, fractionalPart) {
  return +((Math.random() * (max - min + 1) + min).toFixed(fractionalPart));
};

getRandomFractionNumber();
