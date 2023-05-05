import {showBigPhoto} from './showBigPhoto.js';
import {debounce} from './util.js';

const photoContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture');

const pictureTitle = photoContainer.children[0];
const uploadForm = photoContainer.children[1];

const defaultButton = document.querySelector('#filter-default');
const randomButton = document.querySelector('#filter-random');
const discussedButton = document.querySelector('#filter-discussed');

const setRandomOrder = (cb) => {
  randomButton.addEventListener('click', () => {
    defaultButton.classList.remove('img-filters__button--active');
    randomButton.classList.add('img-filters__button--active');
    discussedButton.classList.remove('img-filters__button--active');
    debounce(renderRandomList(cb));
  });
};
const setDiscussedOrder = (cb) => {
  discussedButton.addEventListener('click', () => {
    defaultButton.classList.remove('img-filters__button--active');
    randomButton.classList.remove('img-filters__button--active');
    discussedButton.classList.add('img-filters__button--active');
    debounce(renderDiscussedList(cb));
  });
};

const SetDefaultOrder = (cb) => {
  defaultButton.addEventListener('click', () => {
    defaultButton.classList.add('img-filters__button--active');
    randomButton.classList.remove('img-filters__button--active');
    discussedButton.classList.remove('img-filters__button--active');
    debounce(renderDefaultList(cb));
  });
};

const getPhotodRank = (photo) => photo.comments.length;

const comparePhotos = (photoA, photoB) => {
  const rankA = getPhotodRank(photoA);
  const rankB = getPhotodRank(photoB);
  return rankB - rankA;
};

function renderDefaultList(description) {
  const photoFragment = document.createDocumentFragment();
  for (const item of description) {
    const photo = photoTemplate.cloneNode(true).content;
    photo.querySelector('.picture__img').src = item.url;
    photo.querySelector('.picture__img').addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPhoto(item);
    });
    photo.querySelector('.picture__likes').textContent = item.likes;
    photo.querySelector('.picture__comments').textContent = item.comments.length;
    photoFragment.appendChild(photo);
  }
  photoContainer.innerHTML = '';
  photoContainer.appendChild(pictureTitle);
  photoContainer.appendChild(uploadForm);
  photoContainer.appendChild(photoFragment);
}

function renderDiscussedList(similarPhotos) {
  const photoFragment = document.createDocumentFragment();

  similarPhotos
    .slice()
    .sort(comparePhotos)
    .forEach((item) => {
      const photo = photoTemplate.cloneNode(true).content;
      photo.querySelector('.picture__img').src = item.url;
      photo.querySelector('.picture__img').addEventListener('click', (evt) => {
        evt.preventDefault();
        showBigPhoto(item);
      });
      photo.querySelector('.picture__likes').textContent = item.likes;
      photo.querySelector('.picture__comments').textContent = item.comments.length;
      photoFragment.appendChild(photo);
    });
  photoContainer.innerHTML = '';
  photoContainer.appendChild(pictureTitle);
  photoContainer.appendChild(uploadForm);
  photoContainer.appendChild(photoFragment);
}

function renderRandomList(similarPhotos) {
  const photoFragment = document.createDocumentFragment();

  similarPhotos
    .slice()
    .sort(() => Math.random() - 0.5)
    .forEach((item) => {
      const photo = photoTemplate.cloneNode(true).content;
      photo.querySelector('.picture__img').src = item.url;
      photo.querySelector('.picture__img').addEventListener('click', (evt) => {
        evt.preventDefault();
        showBigPhoto(item);
      });
      photo.querySelector('.picture__likes').textContent = item.likes;
      photo.querySelector('.picture__comments').textContent = item.comments.length;
      photoFragment.appendChild(photo);
    });
  photoContainer.innerHTML = '';
  photoContainer.appendChild(pictureTitle);
  photoContainer.appendChild(uploadForm);
  photoContainer.appendChild(photoFragment);
}

export {renderDefaultList, setDiscussedOrder, setRandomOrder, SetDefaultOrder};
