const RandomValue = function(min, max) {
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

RandomValue(0, 25);

const MaxLength = function(line, maxLength) {
  if (line.length <= maxLength) {
    return true;
  } else {
    return false;
  }
};

MaxLength('Some text', 26);


