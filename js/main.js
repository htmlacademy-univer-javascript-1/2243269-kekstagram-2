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
    return Math.floor(Math.random()*(max-min+1))+min; //Подсмотрено здесь: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  }
};

const verifyLength = function(line, maxLength) {
  //return (line.length <= maxLength) ? true : false; Почему на гитхабе ошибка при тернарной записи?
  if (line.length <= maxLength) {
    return true;
  } else {
    return false;
  }
};

verifyLength('Some text', 26);

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Антон',
  'Ирина',
  'Сергей',
  'Виктория',
  'Марина',
  'Михаил',
];

let PHOTO_DESCRIPTION = [
  'Лучший отпуск.',
  'Путешевствия врдохновляют.',
  'Это была незабываемая поездка. Увидимся следующим летом, моя любовь.',
  'Охота за впечатлениями.',
  'Невероятная красота.',
  'Чудеса да и только',
];

const PHOTO_COUNT = 25;

const getRandomArrayElement = (elements) => {
  return elements[randomiseValue(0, elements.length - 1)];
};

const createUnique = (a,b) => {
  let arr = [];
  const total = b - a + 1;
  do {
    const randomNumber = randomiseValue(a,b);
    if (!arr.includes(randomNumber)) {
      arr.push(randomNumber);
    }
  } while (arr.length < total);
  return arr;
};

const NUMBER_OF_COMMENTS = randomiseValue(1,2);

const getComment = function() {
  const COMMENT_LENGTH = 1;
  let comment = getRandomArrayElement(COMMENTS);
  for (let i = 1; i <= COMMENT_LENGTH - 1; i++) {
    if(!comment.includes(COMMENTS[i])) {
      comment += ' ' + getRandomArrayElement(COMMENTS);
    }
  }
  return comment;
};

const getElement = (arr,k) => {
  return arr[k];
}
let i = -1;
const COMMENT_MESSAGE = Array.from({length: PHOTO_COUNT*NUMBER_OF_COMMENTS}, getComment);

const ArrOfValues = createUnique(1, PHOTO_COUNT);

const createComment = () => {
  i+=1;
  return {
    id: getElement(ArrOfValues,i),
    avatar: 'img/avatar-' + randomiseValue(1,6) + '.svg',
    message: getRandomArrayElement(COMMENT_MESSAGE),
    name: getRandomArrayElement(NAMES),
  };
};

const SIMILAR_COMMENT = Array.from({length: PHOTO_COUNT}, createComment);

i=-1;
let j = 25;
const createPhoto = () => {
  i+=1;
  j-=1;
  createUnique(1,25);
  return {
    id: getElement(ArrOfValues,i),
    url: 'photos/' + getElement(ArrOfValues,j) + '.jpg',
    description: getRandomArrayElement(PHOTO_DESCRIPTION),
    likes: randomiseValue(15,200),
    comments: getRandomArrayElement(SIMILAR_COMMENT),
  };
};

const similarPhoto = Array.from({length: PHOTO_COUNT}, createPhoto);
