//FT-14 По нажатию на кнопку "Watched" показываются просмотренные фильмы пользователя (local-storage)
//import cardTemplate from '../templates/film-list.hbs';
import { refs } from './refs.js';
import cardTemplate from '../templates/cardTemplate.hbs';
import cardsLits from '../templates/film-list.hbs';
import getGenres from './get-genres.js';
import { pnotifyNotice } from './pnotify.js';
import { hideWarningMessage, showWarningMessage } from './warning-msg.js';
import getPoster from './get-poster.js';
import getPosterModal from './get-poster-modal.js';
import { renderFilmsGallery } from './fetch-film-test.js';

import FilmsApiService from './class-fetch.js';
const filmsApiService = new FilmsApiService();



// const BASE_URL = 'https://api.themoviedb.org/3/';
// const apiKey = 'd2f58f193ec10f64760e31baa52fd192';

refs.onWatchedBtn.addEventListener('click', onMyLibaMovies);
refs.onQueueBtn.addEventListener('click', onMyLibaMovies);

// get data fon localStorage
function onMyLibaMovies(e, key = e.target.getAttribute('id')) {
  refs.gallery.innerHTML = '';

  try {
    const serializedState = localStorage.getItem(key);
    const movies = JSON.parse(serializedState);
    renderFilmsGalleryOnLiba(movies);
  } catch(error) {
      showWarningMessage(
        'Oops! Something went wrong... Please try again. If the problem persists, contact our customer support',
      );
      console.log(error);
    };
}

function onMyLibaMoviesQueue(e) {
  refs.paginationRef.classList.add('is-hidden');
  //console.log(refs.paginationRef);
  return onMyLibaMovies(e, 'queue');
}

function renderFilmsGalleryOnLiba(movies) {
  const markup = cardTemplate(movies);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

//add to  localStorage
refs.lightboxContent.addEventListener('click', addTolocalStorage);


function addTolocalStorage(e) {
  if (e.target.nodeName !== 'BUTTON' || e.target.dataset.action === 'close-lightbox' || e.target.dataset.action === 'trailer' ) {
     return;
   } else {
    let localStorageKey = e.target.dataset.action;
    const id = e.target.getAttribute('id');
    let existingEntries = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    if (existingEntries.find(entry => entry.id == id)) {
      return pnotifyNotice();
    } else {
      filmsApiService.fetchMovieDetails(id)
        .then(getPosterModal)
        .then(movieData => {
          try {
            if (existingEntries === null) existingEntries = [];

            existingEntries.push(movieData);
            localStorage.setItem(localStorageKey, JSON.stringify(existingEntries));
          } catch(error) {
            showWarningMessage(
              'Oops! Something went wrong... Please try again. If the problem persists, contact our customer support',
            );
            console.log(error);
          };
        });
    }
  }
}

refs.onLibraryBtn.addEventListener('click', hideWarningMessage);
refs.onLibraryBtn.addEventListener('click', onMyLibaMoviesQueue);

