import noPoster from '../img/No_image_poster.png';

export default function getPoster(data) {
  const BASE_PATH = 'https://image.tmdb.org/t/p/w500';
  for (let film of data) {
    film.poster = '';
    if (film.poster_path) {
      film.poster = BASE_PATH + film.poster_path;
    } else {
      film.poster = `${noPoster}`;
    }
  }
  return data;
}
