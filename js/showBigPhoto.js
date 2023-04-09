import { isEscapeKey } from './util';

const bigPicture = document.querySelector('.big-picture');

const AVATAR_PICT_SIZE = 35;

function createAvatar(avatarUrl, userName) {
  const avatarPict = document.createElement('img');
  avatarPict.classList.add('.social__picture');
  avatarPict.src = avatarUrl;
  avatarPict.alt = userName;

  avatarPict.width = AVATAR_PICT_SIZE;
  avatarPict.height = AVATAR_PICT_SIZE;

  return avatarPict;
}

function createCommentText(textMessage) {
  const commentText = document.createElement('p');
  commentText.classList.add('.social__text');
  commentText.textContent = textMessage;

  return commentText;
}

function createComments({avatar, name, message}) {
  const elementList = document.createElement('li');

  elementList.classList.add('.social_comments');

  elementList.appendChild(createAvatar(avatar, name));
  elementList.appendChild(createCommentText(message));

  return elementList;
}

const onBigPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
};

function createBigPhoto({url, likes, description, comments}) {
  bigPicture.querySelector('.big-picture__img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;

  const commentFragment = document.createDocumentFragment();
  for (const comment of comments) {
    commentFragment.appendChild(createComments(comment));
  }

  bigPicture.querySelector('.social__comments').replaceChildren(commentFragment);
  bigPicture.querySelector('.social__caption').textContent = description;
}

const onBigPhotoInChange = (evt) => {
  if (evt.target.value) {
    showBigPhoto();
  }
};

export function showBigPhoto(picture) {
  if (document.body.classList.contains('modal-open')) {
    return;
  }

  createBigPhoto(picture);

  const bigPhoto = document.querySelector('.big-picture');
  const closeBigPhotoBut = document.querySelector('.big-picture__cancel');

  bigPhoto.querySelector('.social__comment-count').classList.add('hidden');
  bigPhoto.querySelector('.comments-loader').classList.add('hidden');

  bigPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onBigPhotoEscKeydown);
  closeBigPhotoBut.addEventListener('click', onBigPhotoInChange);
}

const bigPhotoCansel = () => {
  closeBigPhoto();
};

function closeBigPhoto() {
  if (document.body.classList.contains('modal-open') === false) {
    return;
  }
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  const closeBigPhotoBut = document.querySelector('#picture-cancel');
  document.removeEventListener('keydown', onBigPhotoEscKeydown);
  closeBigPhotoBut.removeEventListener('click', bigPhotoCansel);

  bigPicture.value = null;
}


bigPicture.addEventListener('change', onBigPhotoInChange);

const escapePressed = (evt) => evt.key === 'Escape' && closeBigPhoto();
document.addEventListener('keydown',(evt) => escapePressed(evt));
bigPicture.querySelector('#picture-cancel').addEventListener('click', closeBigPhoto);

