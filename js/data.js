import {randomiseValue, getElement, getRandomArrayElement,createUnique} from './util.js';

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

const PHOTO_DESCRIPTION = [
  'Лучший отпуск.',
  'Путешевствия врдохновляют.',
  'Это была незабываемая поездка. Увидимся следующим летом, моя любовь.',
  'Охота за впечатлениями.',
  'Невероятная красота.',
  'Чудеса да и только',
];

const PHOTO_COUNT = 25;


const ArrOfValues = createUnique(1, PHOTO_COUNT);
let numb = -1;
const createComment = () => {
  numb+=1;
  return {
    id: getElement(ArrOfValues,numb),
    avatar: `img/avatar-${  randomiseValue(1,6)  }.svg`,
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES),
  };
};

const SIMILAR_COMMENT = Array.from({length: PHOTO_COUNT}, createComment);

numb=-1;
let j = 25;
const createPhoto = () => {
  numb+=1;
  j-=1;
  createUnique(1,25);
  return {
    id: getElement(ArrOfValues,numb),
    url: `photos/${ getElement(ArrOfValues,j) }.jpg`,
    description: getRandomArrayElement(PHOTO_DESCRIPTION),
    likes: randomiseValue(15,200),
    comments: getRandomArrayElement(SIMILAR_COMMENT),
  };
};

const similarPhoto = Array.from({length: PHOTO_COUNT}, createPhoto);


export {similarPhoto};
