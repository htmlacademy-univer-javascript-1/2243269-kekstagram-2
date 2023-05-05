import {showAlert} from './util.js';

const photoFilter = document.querySelector('.img-filters ');

const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
      photoFilter.classList.remove('img-filters--inactive');
    })
    .catch(() => {
      showAlert('Не удалось получить фотографии других пользователей(', 10**10, 0.6);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
      //тип  multipart/form-data пришлось убрать, поскольку с ним не удавалось отправить форму на сервер
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
