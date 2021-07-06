const getRandomInteger = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFractionNumber = function (min, max, fractionalPart) {
  return +((Math.random() * (max - min + 1) + min).toFixed(fractionalPart));
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length -1)];

const syncTime = (toOption, fromOption) => {
  fromOption.value = toOption.value;
};

export{getRandomInteger, getRandomFractionNumber, getRandomArrayElement, syncTime};
