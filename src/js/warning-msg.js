import warningMsg from '../templates/warning-message.hbs';
import { refs } from './refs';

let warnMesgEl = '';
let warnMesTextEl = '';

export function createWarningMessageEl() {
  let warningMessageMarkup = warningMsg();
  refs.footerEl.insertAdjacentHTML('afterend', warningMessageMarkup);
  warnMesgEl = document.querySelector('.warning-notify');
  warnMesTextEl = document.querySelector('.warning-notify__content');
}

export function showWarningMessage(message) {
  warnMesTextEl.textContent = message;
  if (warnMesgEl.classList.contains('visually-hidden')) {
    warnMesgEl.classList.remove('visually-hidden');
  }
}

export function hideWarningMessage() {
  warnMesTextEl.textContent = '';
  if (!warnMesgEl.classList.contains('visually-hidden')) {
    warnMesgEl.classList.add('visually-hidden');
  }
}
