import {addPhotoMin} from './minPhoto.js';
import {setUserFormSubmit} from './userForm.js';
import './validatePictForm.js';
import './changePhoto.js';
import {getData} from './serverConnection.js';
import {closeBigPhoto} from './showBigPhoto.js';

getData((similarPhoto) => {
  addPhotoMin(similarPhoto);
});

setUserFormSubmit(closeBigPhoto);
