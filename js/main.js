const randomiseValue = function(min, max) {
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

randomiseValue(0, 25);

const verifyLength = function(line, maxLength) {
  //return (line.length <= maxLength) ? true : false; Почему на гитхабе ошибка при тернарной записи?
  if (line.length <= maxLength) {
    return true;
  } else {
    return false;
  }   
};

verifyLength('Some text', 26);


