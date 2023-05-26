import { refs } from './refs';


refs.paginationRef.addEventListener('click', onPaginationClick);

let currentPage = 1;

let btns = document.querySelectorAll('.pagination-button');




function leftArrowBuild(event) {
      refs.leftArrowRef.hidden = event;
      refs.prevDotsRef.hidden = event;
      refs.firstPageRef.hidden = event;
 };
function rightArrowBuild(event) {
      refs.rightArrowRef.hidden = event;
      refs.nextDotsRef.hidden = event;
      refs.lastPageRef.hidden = event;
};

leftArrowBuild(true);

function onPaginationClick(event) {
  if (event.target.tagName === 'BUTTON') {
    if (Number(event.target.textContent)) {
      currentPage = Number(event.target.textContent);
    }

    refs.prevDotsRef.hidden = true;
    refs.nextDotsRef.hidden = true;

    if (event.target.classList.contains('pagination-button')) {
      btns.forEach(el => el.classList.remove('pagination-select'));
      event.target.classList.add('pagination-select');
    }

    if (event.target.classList.contains('arrow-right') && currentPage < 1000) {
      btns.forEach(el => el.classList.remove('pagination-select'));
      refs.btn1Ref.classList.add('pagination-select');
      refs.btn1Ref.textContent = Number(refs.btn1Ref.textContent) + 5;
      refs.btn2Ref.textContent = Number(refs.btn2Ref.textContent) + 5;
      refs.btn3Ref.textContent = Number(refs.btn3Ref.textContent) + 5;
      refs.btn4Ref.textContent = Number(refs.btn4Ref.textContent) + 5;
      refs.btn5Ref.textContent = Number(refs.btn5Ref.textContent) + 5;
      currentPage = refs.btn1Ref.textContent;
    }

    if (event.target.classList.contains('arrow-left') && currentPage >= 5) {
      btns.forEach(el => el.classList.remove('pagination-select'));
      refs.btn1Ref.textContent = Number(refs.btn1Ref.textContent) - 5;
      refs.btn2Ref.textContent = Number(refs.btn2Ref.textContent) - 5;
      refs.btn3Ref.textContent = Number(refs.btn3Ref.textContent) - 5;
      refs.btn4Ref.textContent = Number(refs.btn4Ref.textContent) - 5;
      refs.btn5Ref.textContent = Number(refs.btn5Ref.textContent) - 5;
      refs.btn5Ref.classList.add('pagination-select');
      currentPage = refs.btn5Ref.textContent;
    }

    if (event.target.classList.contains('first-button')) {
      btns.forEach(el => el.classList.remove('pagination-select'));
      refs.btn1Ref.textContent = 1;
      refs.btn2Ref.textContent = 2;
      refs.btn3Ref.textContent = 3;
      refs.btn4Ref.textContent = 4;
      refs.btn5Ref.textContent = 5;
      refs.btn1Ref.classList.add('pagination-select');
      currentPage = refs.btn1Ref.textContent;
      leftArrowBuild(true);
    }

    if (event.target.classList.contains('last-button')) {
      btns.forEach(el => el.classList.remove('pagination-select'));
      refs.btn1Ref.textContent = Number(refs.lastPageRef.textContent) - 4;
      refs.btn2Ref.textContent = Number(refs.lastPageRef.textContent) - 3;
      refs.btn3Ref.textContent = Number(refs.lastPageRef.textContent) - 2;
      refs.btn4Ref.textContent = Number(refs.lastPageRef.textContent) - 1;
      refs.btn5Ref.textContent = refs.lastPageRef.textContent;
      refs.btn5Ref.classList.add('pagination-select');
      currentPage = refs.btn5Ref.textContent;
      rightArrowBuild(true);
    }

    if (Number(currentPage) > 5) {
        leftArrowBuild(false);
    } else {
        leftArrowBuild(true);
    }
    if (Number(currentPage) < 996) {
      rightArrowBuild(false);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
    }
}


export function resetPage (){
  btns.forEach(el => el.classList.remove('pagination-select'));
  refs.btn1Ref.textContent = 1;
  refs.btn2Ref.textContent = 2;
  refs.btn3Ref.textContent = 3;
  refs.btn4Ref.textContent = 4;
  refs.btn5Ref.textContent = 5;
  refs.btn1Ref.classList.add('pagination-select');
  currentPage = refs.btn1Ref.textContent;
  leftArrowBuild(true);
}