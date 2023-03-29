const bigPicture = document.querySelector('.big-picture');
const escapePressed = (ev) => ev.key === 'Escape' && closeBigPhoto();
document.addEventListener('keydown',(ev) => escapePressed(ev));
bigPicture.querySelector('#picture-cancel').addEventListener('click', closeBigPhoto);

const AVATAR_PICT_SIZE = 35;

function createAvatar({avatarUrl, userName}) {
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

function createBigPhoto({url, likes, description, comments}) {
  bigPicture.querySelector('.big-picture__img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;

  const commentFragment = document.createDocumentFragment();

  for (const comment of comments) {
    commentFragment.appendChild(createComments(comment));
  }

  bigPicture.querySelector('.social__comment-count').replaceChildren(commentFragment);
  bigPicture.querySelector('.social__caption').textContent = description;
}


export function showBigPhoto(picture) {
  if (document.body.classList.contains('modal-open')) {
    return;
  }

  createBigPhoto(picture);

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function closeBigPhoto() {
  if (document.body.classList.contains('modal-open') === false) {
    return;
  }
  showBigPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');
}
