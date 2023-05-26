import { refs } from './refs';
export default function closeModalDetailsFilm(e) {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxContent.innerHTML = '';
}
