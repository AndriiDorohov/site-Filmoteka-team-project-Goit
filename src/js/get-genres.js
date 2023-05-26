import decodingGenres from './db-coding-genre';

export default function getGenres(data) {
  for (let film of data) {
    film.genres_name = [];
    film.release_date = film.release_date.substring(0, 4);
    for (let id of film.genre_ids) {
      for (let genre of decodingGenres) {
        if (id === genre.id) {
          film.genres_name.push(genre.name);
          if (film.genres_name.length > 2) {
            film.genres_name.splice(2, 4, 'Other');
          }
        } else {
          continue;
        }
      }
    }
  }
  return data;
}
