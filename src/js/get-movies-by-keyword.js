/* Функция получает и рендерит первую страницу фильмов по ключевому слову */

import { refs } from './refs';
import movieCard from '../templates/movieCard.hbs';

import { createWarningMessageEl, showWarningMessage, hideWarningMessage } from './warning-msg.js';

import FilmsApiService from './class-fetch';
import { getMovieGenres } from './fetch-genres-list';
import getPoster from './get-poster';
import getGenres from './get-genres';
import { renderFilmsGallery } from './fetch-film-test';
import { resetPage } from './pagination'

import debounce from 'lodash.debounce';



const filmsApiService = new FilmsApiService();

createWarningMessageEl();

refs.inputEl.addEventListener('input', debounce(onEnterSearchQuery, 700));
refs.onHomeBtn.addEventListener('click', onHomeBtnClick);
refs.onLibraryBtn.addEventListener('click', onLibraryBtnClick);
refs.inputEl.addEventListener('savedInput', onEnterSearchQuery);

function onEnterSearchQuery(event) {
  const query = event.target.value;

  if (!query) {
    resetPage();
    hideWarningMessage();
    sessionStorage.removeItem('searchQuery');
    refs.gallery.innerHTML = '';
    filmsApiService.fetchTrendingMovies()
    .then(getGenres)
    .then(getPoster)
    .then(renderFilmsGallery)
    .catch(error => {
      showWarningMessage(
        'Oops! Something went wrong... Please try again. If the problem persists, contact our customer support',
      );
      console.log(error);
    });
    return;
  }
  resetPage();
  sessionStorage.setItem('searchQuery', query);
  getMovieByKeyword(query);
}

function renderPicturesGallery(movies) {
  if (movies.length === 0) {
    sessionStorage.removeItem('searchQuery');
    showWarningMessage(
      'Search result not successful. Enter the correct movie name and try again, please.',
    );
    return;
  }

  hideWarningMessage();
  const markup = movieCard(movies);
  refs.gallery.innerHTML = '';
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function onHomeBtnClick() {
  const savedQuery = sessionStorage.getItem('searchQuery');
  resetPage();
  refs.paginationRef.classList.remove('is-hidden');

  if (savedQuery) {
    refs.gallery.innerHTML = '';
    refs.inputEl.value = savedQuery;
    refs.inputEl.dispatchEvent(new Event('savedInput', { bubbles: false }));
  } else {
    refs.gallery.innerHTML = '';
    filmsApiService.fetchTrendingMovies()
    .then(getPoster)
    .then(getGenres)
    .then(renderFilmsGallery)
    .catch(error => {
      showWarningMessage(
        'Oops! Something went wrong... Please try again. If the problem persists, contact our customer support',
      );
      console.log(error);
    });

  }
}


function onLibraryBtnClick() {
  refs.inputEl.value = '';
  hideWarningMessage();
}


export function getMovieByKeyword(query, currentPage = 1) {
  const genres = filmsApiService.fetchGenres();
  const movies = filmsApiService.fetchMoviesByKeyWord(query, currentPage);

  Promise.all([genres, movies])
    .then(getMovieGenres)
    .then(getPoster)
    .then(renderPicturesGallery)
    .catch(error => {
      showWarningMessage(
        'Oops! Something went wrong... Please try again. If the problem persists, contact our customer support',
      );
      console.log(error);
    });
}
