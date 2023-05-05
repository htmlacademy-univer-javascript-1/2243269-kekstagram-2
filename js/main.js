import {renderDefaultList, setDiscussedOrder, setRandomOrder,SetDefaultOrder} from './minPhoto.js';
import {setUserFormSubmit} from './userForm.js';
import './redactPhoto.js';
import {getData} from './serverConnection.js';
import {closeBigPhoto} from './showBigPhoto.js';

getData((similarPhoto) => {
  renderDefaultList(similarPhoto);
  setDiscussedOrder(similarPhoto);
  setRandomOrder(similarPhoto);
  SetDefaultOrder(similarPhoto);
});

setUserFormSubmit(closeBigPhoto);
