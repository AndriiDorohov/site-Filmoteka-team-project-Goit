import noPoster from '../img/No_image_poster.png';

export default function getPosterModal(data) {
  const BASE_PATH = 'https://image.tmdb.org/t/p/w500';
    data.poster = '';
    if (data.poster_path) {
      data.poster = BASE_PATH + data.poster_path;
    } else {
      data.poster = `${noPoster}`;
    }
  return data;
}
