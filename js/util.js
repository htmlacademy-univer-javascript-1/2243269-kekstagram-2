const randomiseValue = (min, max) => {
  if (min >= 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    if (max < min) {
      const helper = min;
      min = max;
      max = helper;
    } else if (max === min) {
      return max;
    }
    return Math.floor(Math.random()*(max-min+1))+min; //Подсмотрено здесь: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  }
};

const verifyLength = function(line, maxLength) {
  //return (line.length <= maxLength) ? true : false; Почему на гитхабе ошибка при тернарной записи?
  if (line.length <= maxLength) {
    return true;
  } else {
    return false;
  }
};

verifyLength('Some text', 26);

const getRandomArrayElement = (elements) =>  elements[randomiseValue(0, elements.length - 1)];

const createUnique = (a,b) => {
  const arr = [];
  const total = b - a + 1;
  do {
    const randomNumber = randomiseValue(a,b);
    if (!arr.includes(randomNumber)) {
      arr.push(randomNumber);
    }
  } while (arr.length < total);
  return arr;
};

const getElement = (arr,k) => arr[k];

export {randomiseValue, getRandomArrayElement, createUnique, getElement};
