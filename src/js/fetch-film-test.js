import cardsLits from '../templates/film-list.hbs';

import { refs } from './refs';
import closeModalDetailsFilm from './close-modal-details-film';
import modalCard from '../templates/film-modal.hbs';
import Trailer from '../templates/trailer.hbs';
import getPoster from './get-poster.js';
import getPosterModal from './get-poster-modal.js';
import getGenres from './get-genres.js';
import removeEventListener from './remover-event-listener';
import { get } from 'lodash';
import FilmsApiService from './class-fetch.js';

// Fetch main page

const filmsApiService = new FilmsApiService();


filmsApiService.fetchTrendingMovies().then(getGenres).then(getPoster).then(renderFilmsGallery);

export function renderFilmsGallery(movies) {
  const markup = cardsLits(movies);

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
// Fetch film-details page
refs.gallery.addEventListener('click', e => {
  const id = e.target.getAttribute('id');

  if (e.target.nodeName !== 'IMG') {
    return;
  } else {
    filmsApiService.fetchMovieDetails(id)
      .then(getPosterModal)
      .then(renderCard)
      .catch(error => {
        showWarningMessage(
          'Oops! Something went wrong... Please try again. If the problem persists, contact our customer support',
        );
        console.log(error);
      });

    pressESC();

    refs.lightbox.classList.add('is-open');
  }
});

//Render Details Card
function renderCard(data) {
  const markupCard = modalCard(data);

  refs.lightboxContent.insertAdjacentHTML('beforeend', markupCard);
}

function pressESC(e) {
  const pressEscEventListener = window.addEventListener('keyup', e => {
    if (refs.lightbox.classList.contains('is-open')) {
      let key = e.keyCode;

      if (key === 27) {
        refs.lightbox.classList.remove('is-open');
        refs.lightboxContent.innerHTML = '';
        renderFilmsGallery();
        removeEventListener(pressEscEventListener);
      }
    }
  });
}

const pressOverlayListener = refs.lightboxOverlay.addEventListener('click', e => {
  closeModalDetailsFilm();
  removeEventListener(pressOverlayListener);
});

const pressCloseBtnModal = refs.lightboxContent.addEventListener('click', e => {
  if (e.target.dataset.action === 'close-lightbox') {
    closeModalDetailsFilm();
    removeEventListener(pressCloseBtnModal);
  }
});

// open trailer
const openTrailerFilm = refs.lightboxContent.addEventListener('click', e => {
  if (e.target.dataset.action === 'trailer') {
    const id = e.target.getAttribute('id');
    
    filmsApiService.fetchOpenVideo(id)
      .then(openTrailer)
      .then(removeEventListener)
      .catch(error => {
        showWarningMessage(
          'Oops! Something went wrong... Please try again. If the problem persists, contact our customer support',
        );
        console.log(error);
      });
  }
});
function openTrailer(movie) {
  const markuptrailer = Trailer(movie);

  refs.lightboxContent.insertAdjacentHTML('beforeend', markuptrailer);
}
