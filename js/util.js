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
    return Math.floor(Math.random()*(max-min+1))+min;
  }
};

const verifyLength = function(line, maxLength) {
  if (line.length <= maxLength) {
    return true;
  } else {
    return false;
  }
};

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


const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message, time, opacity) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '25px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.opacity = opacity;

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, time);
};

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {randomiseValue, getRandomArrayElement, createUnique, getElement, isEscapeKey, verifyLength, showAlert, debounce};
