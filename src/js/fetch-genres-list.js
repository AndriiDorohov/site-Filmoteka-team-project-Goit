const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'd2f58f193ec10f64760e31baa52fd192';

export function fetchGenres() {
  return fetch(`${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then(r => r.json())
    .then(data => {
      return data.genres;
    });
}

export function getMovieGenres([genresList, data]) {
  for (let film of data) {
    film.genres_name = [];
    film.release_date = film.release_date.substring(0, 4);
    for (let id of film.genre_ids) {
      for (let genre of genresList) {
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
