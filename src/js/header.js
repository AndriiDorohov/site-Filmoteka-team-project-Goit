import { refs } from './refs';
// import debounce from 'lodash.debounce';

const {
  onHomeBtn,
  onLibraryBtn,
  inputContainer,
  libraryBtnContainer,
  userInput,
  onWatchedBtn,
  onQueueBtn,
  header,
} = refs;
// console.log(onWatchedBtn);

onHomeBtn.classList.add('current');
libraryBtnContainer.classList.add('display__none');
onWatchedBtn.classList.add('is__active');

class CurrentPage {
  homeBtn() {
    onHomeBtnClassList();
    if (onHomeBtn.classList.contains('current')) {
      return;
    } else {
      onHomeBtn.classList.add('current');
    }
  }
  libraryBtn() {
    OnLibraryBtnClassList();
  }
}
const currentPage = new CurrentPage();

function onHomeBtnClassList() {
  onLibraryBtn.classList.remove('current');
  inputContainer.classList.remove('is-hidden');
  libraryBtnContainer.classList.add('is-hidden');
  libraryBtnContainer.classList.remove('flex');
  header.classList.remove('library__bg__img');
}
function OnLibraryBtnClassList() {
  onLibraryBtn.classList.add('current');
  inputContainer.classList.add('is-hidden');
  libraryBtnContainer.classList.remove('is-hidden');
  libraryBtnContainer.classList.add('flex');
  onHomeBtn.classList.remove('current');
  header.classList.add('library__bg__img');
  QueueBtnClick();
}

onHomeBtn.addEventListener('click', currentPage.homeBtn);
onLibraryBtn.addEventListener('click', currentPage.libraryBtn);

function WatchedBtnClick() {
  onQueueBtn.classList.remove('is__active');
  if (onWatchedBtn.classList.contains('is__active')) {
    return;
  } else {
    onWatchedBtn.classList.add('is__active');
  }
}
function QueueBtnClick() {
  onQueueBtn.classList.add('is__active');
  onWatchedBtn.classList.remove('is__active');
}
onWatchedBtn.addEventListener('click', WatchedBtnClick);
onQueueBtn.addEventListener('click', QueueBtnClick);
