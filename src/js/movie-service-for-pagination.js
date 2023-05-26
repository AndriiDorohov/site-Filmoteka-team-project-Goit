import FilmsApiService from './class-fetch.js';
import getGenres from './get-genres';
import getPoster from './get-poster';
import cardsLits from '../templates/film-list.hbs';
import { refs } from './refs.js';
import { getMovieByKeyword } from './get-movies-by-keyword.js';
import { renderFilmsGallery } from './fetch-film-test.js';

const filmsApiService = new FilmsApiService();

refs.paginationRef.addEventListener('click', onCurrentPage);



// function onCurrentPage(event) {
//   if (event.target.classList.contains('pagination-button')) {
//     let currentPage = Number(event.target.textContent);
//     console.log(currentPage);
//     if (currentPage > 0) {
//       if (refs.inputEl.value === '') {
//         onPaginationBtn(currentPage);
//       } else {
//         refs.gallery.innerHTML = '';
//         getMovieByKeyword(refs.inputEl.value, currentPage)
//         .catch(error => {
//           showWarningMessage(
//             'Oops! Something went wrong... Please try again. If the problem persists, contact our customer support',
//           );
//           console.log(error);
//         });
//       }
//     } else if (event.target.classList.contains('arrow-right')) {
//         currentPage = +refs.btn1Ref.textContent;
//         onPaginationBtn (currentPage);
//       } else if (event.target.classList.contains('arrow-left')) {
//         currentPage = +refs.btn5Ref.textContent;
//         onPaginationBtn (currentPage); 
//       }
//   }
// }


function onPaginationBtn (currentPage) {
  refs.gallery.innerHTML = '';
        filmsApiService
          .fetchTrendingMovies(currentPage)
          .then(getGenres)
          .then(getPoster)
          .then(renderFilmsGallery)
          .catch(error => {
            showWarningMessage('Oops! Something went wrong... Please try again. If the problem persists, contact our customer support');
            console.log(error);
          });
}

function onPaginationBtnForInput (currentPage){
  refs.gallery.innerHTML = '';
  getMovieByKeyword(refs.inputEl.value, currentPage)
  .catch(error => {
  showWarningMessage(
    'Oops! Something went wrong... Please try again. If the problem persists, contact our customer support',
  );
  console.log(error);
  });
}



function onCurrentPage(event) {
  if (event.target.classList.contains('pagination-button')) {
    let currentPage = Number(event.target.textContent);
    console.log(currentPage);
    if (refs.inputEl.value === ''){
      if (currentPage > 0) {
        onPaginationBtn(currentPage);
      } else if (event.target.classList.contains('arrow-right')) {
        currentPage = +refs.btn1Ref.textContent;
        onPaginationBtn (currentPage);
      } else if (event.target.classList.contains('arrow-left')) {
        currentPage = +refs.btn5Ref.textContent;
        onPaginationBtn (currentPage); 
      }
    } else {
      if (currentPage > 0) {
        onPaginationBtnForInput (currentPage);
      } else if (event.target.classList.contains('arrow-right')) {
        currentPage = +refs.btn1Ref.textContent;
        onPaginationBtnForInput (currentPage);
      } else if (event.target.classList.contains('arrow-left')) {
        currentPage = +refs.btn5Ref.textContent;
        onPaginationBtnForInput (currentPage); 
      }
      
    }
  }

}
    