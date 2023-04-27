import {isEscapeKey} from './util.js';

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

  const commentFragment = document.createDocumentFragment();

  bigPicture.querySelector('.big-picture__img').children[0].src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__comment-count').textContent = `${5} из ${comments.length} комментариев `;
  //bigPicture.querySelector('.comments-count').textContent = comments.length;
  for (const comment of comments) {
    commentFragment.appendChild(createComments(comment));
  }

  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.social__comments').replaceChildren(commentFragment);
}

const onBigPhotoInChange = (evt) => {
  if (evt.target.value) {
    showBigPhoto();
  }
};
let numberOfComments = 0;
const showCommentsButton = document.querySelector('.social__comments-loader');

const showMoreComments = () => {
  const allComments = bigPicture.querySelector('.social__comments');
  for (let i = 5 + numberOfComments; i < 10 + numberOfComments; i++) {
    if (i < allComments.childElementCount) {
      allComments.children[i].classList.remove('hidden');
    }
  }
  if (numberOfComments + 10 >= allComments.childElementCount) {
    showCommentsButton.removeEventListener('click', showMoreComments);
    showCommentsButton.classList.add('hidden');
  }
  numberOfComments += 5;
  if (numberOfComments + 5 <= allComments.childElementCount) {
    document.querySelector('.social__comment-count').textContent = `${numberOfComments + 5} из ${allComments.childElementCount} комментариев `;
  } else {
    document.querySelector('.social__comment-count').textContent = `${allComments.childElementCount} из ${allComments.childElementCount} комментариев `;
  }
};

export function showBigPhoto(picture) {
  if (document.body.classList.contains('modal-open')) {
    return;
  }

  createBigPhoto(picture);

  const bigPhoto = document.querySelector('.big-picture');
  const closeBigPhotoBut = document.querySelector('.big-picture__cancel');
  const allComments = bigPhoto.querySelector('.social__comments');
  const commentsNumber = allComments.childElementCount;

  if (Number(commentsNumber) < 5) {
    bigPhoto.querySelector('.comments-loader').classList.add('hidden');
    bigPhoto.querySelector('.social__comment-count').classList.add('hidden');
  } else {
    bigPhoto.querySelector('.social__comment-count').classList.remove('hidden');
    bigPhoto.querySelector('.comments-loader').classList.remove('hidden');

    for (let i = 5; i < allComments.childElementCount; i++) {
      allComments.children[i].classList.add('hidden');
    }
  }

  showCommentsButton.addEventListener('click', showMoreComments);

  bigPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onBigPhotoEscKeydown);
  closeBigPhotoBut.addEventListener('click', closeBigPhoto);
}

export function closeBigPhoto() {
  if (document.body.classList.contains('modal-open') === false) {
    return;
  }
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  const closeBigPhotoBut = document.querySelector('#picture-cancel');
  document.removeEventListener('keydown', onBigPhotoEscKeydown);
  closeBigPhotoBut.removeEventListener('click', onBigPhotoInChange);

  bigPicture.value = null;
  numberOfComments = 0;
}


bigPicture.addEventListener('change', onBigPhotoInChange);

const escapePressed = (evt) => evt.key === 'Escape' && closeBigPhoto();
document.addEventListener('keydown',(evt) => escapePressed(evt));
bigPicture.querySelector('#picture-cancel').addEventListener('click', closeBigPhoto);

