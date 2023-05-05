import {verifyLength} from './util.js';

const MAX_TAG_VALUE = 5;
const MAX_TAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;

const pictForm = document.querySelector('#upload-select-image');

const validateTag = (tagStr) => {
  if (tagStr.length === 0) {
    return true;
  }

  const tags = tagStr.toLowerCase().split(' ');

  if (tags.length > MAX_TAG_VALUE) {
    return false;
  }

  const re = /^#[a-zA-A0-9а-яА-Я]{1,19}$/;
  const tagsArr = [];

  for (const tag of tags) {
    if (!tagsArr.includes(tag)) {
      tagsArr.push(tag);
    }
    if (tag.includes('#') > 1) {
      return false;
    }
  }

  if (JSON.stringify(tagsArr) !== JSON.stringify(tags)) {
    return false;
  }

  return tags.every((tag) => re.test(tag)
  && verifyLength(tag, MAX_TAG_LENGTH));
};

function validateComment (comment) {
  return verifyLength(comment, MAX_COMMENT_LENGTH);
}
const pristine = new Pristine(pictForm,{
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper-text',
});

pristine.addValidator(
  pictForm.querySelector('.text__hashtags'),
  validateTag,
  'До 5 не повторяющихся хеш-тегов, разделенных пробелом. После знака # допустимы только буквы и цифры. Хеш-тег не длинее 20 символов включая символ #.'
);

pristine.addValidator(
  pictForm.querySelector('.text__description'),
  validateComment,
  'Длина комментария не более 140 символов.'
);

pictForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

export {pristine};
