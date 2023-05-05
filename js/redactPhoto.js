const changedValue = document.querySelector('.scale__control--value');
const valueBigger = document.querySelector('.scale__control--bigger');
const valueSmaller = document.querySelector('.scale__control--smaller');
const redactedPhotoContainer = document.querySelector('.img-upload__preview');
const redactedPhoto = redactedPhotoContainer.children[0];

const originButton = document.querySelector('#effect-none');
const sepiaButton = document.querySelector('#effect-sepia');
const chromeButton = document.querySelector('#effect-chrome');
const marvinButton = document.querySelector('#effect-marvin');
const phobosButton = document.querySelector('#effect-phobos');
const heatButton = document.querySelector('#effect-heat');

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');

let existSlider = false;
changedValue.value = '100%';

function toMaxValue() {
  let value = changedValue.value;
  const cuttedValue = value.slice(0, value.length-1);
  if (parseInt(cuttedValue,10) <= 75) {
    value = parseInt(value,10);
    value = value + 25;
    value = `${value  }%`;
    changedValue.value = value;
    redactedPhoto.style.height = value;
    redactedPhoto.style.width = value;
  }
}

function toMinValue() {
  let value = changedValue.value;
  const cuttedValue = value.slice(0, value.length-1);
  if (parseInt(cuttedValue,10) >= 50) {
    value = parseInt(value,10);
    value = value - 25;
    value = `${value  }%`;
    changedValue.value = value;
    redactedPhoto.style.height = value;
    redactedPhoto.style.width = value;
  }
}

function createSlider() {
  existSlider = true;
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
  });
}

setNoneFilter();
function setNoneFilter() {
  redactedPhoto.className = '';
  redactedPhoto.style.filter = '';
  redactedPhoto.classList.add('effects__preview--none');
  if (existSlider === true) {
    sliderElement.noUiSlider.destroy();
    existSlider = false;
  }
}

function setSepiaFilter() {
  redactedPhoto.className = '';
  redactedPhoto.classList.add('effects__preview--sepia');
  if (existSlider === false) {
    createSlider();
  }
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  });

  sliderElement.noUiSlider.on('update', () => {
    redactedPhoto.style.filter = `sepia(${sliderElement.noUiSlider.get()})`;
  });
}
function setChromeFilter() {
  redactedPhoto.className = '';
  redactedPhoto.classList.add('effects__preview--chrome');
  if (existSlider === false) {
    createSlider();
  }
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  });

  sliderElement.noUiSlider.on('update', () => {
    redactedPhoto.style.filter = `grayscale(${sliderElement.noUiSlider.get()})`;
  });
}
function setMarvinFilter() {
  redactedPhoto.className = '';
  redactedPhoto.classList.add('effects__preview--marvin');
  if (existSlider === false) {
    createSlider();
  }
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1
  });

  sliderElement.noUiSlider.on('update', () => {
    redactedPhoto.style.filter = `invert(${sliderElement.noUiSlider.get()}%)`;
  });
}
function setPhobosFilter() {
  redactedPhoto.className = '';
  redactedPhoto.classList.add('effects__preview--phobos');
  if (existSlider === false) {
    createSlider();
  }
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1
  });

  sliderElement.noUiSlider.on('update', () => {
    redactedPhoto.style.filter = `blur(${sliderElement.noUiSlider.get()}px)`;
  });
}
function setHeatFilter() {
  redactedPhoto.className = '';
  redactedPhoto.classList.add('effects__preview--heat');
  if (existSlider === false) {
    createSlider();
  }
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1
  });

  sliderElement.noUiSlider.on('update', () => {
    redactedPhoto.style.filter = ` brightness(${sliderElement.noUiSlider.get()})`;
  });
}

valueBigger.addEventListener('click', toMaxValue);
valueSmaller.addEventListener('click', toMinValue);

originButton.addEventListener('change', setNoneFilter);
sepiaButton.addEventListener('change', setSepiaFilter);
chromeButton.addEventListener('change', setChromeFilter);
marvinButton.addEventListener('change', setMarvinFilter);
phobosButton.addEventListener('change', setPhobosFilter);
heatButton.addEventListener('change', setHeatFilter);

export {setNoneFilter};
