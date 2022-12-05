import { Injectable } from '@nestjs/common';
import { MovieModelService } from '../helpers/movie.model.service';
import { Movie } from './models/movie.model';

@Injectable()
export class MovieService {
  allMovies: any[];
  constructor(
    private movieModelService: MovieModelService
  ) {}

  async getAllMoviesFromDb() {
    if(!this.allMovies || this.allMovies.length === 0){
      this.allMovies = await this.movieModelService.getAllMoviesFromDb();
    }
    return this.allMovies;
  }

  setOrUpdateMovieToList(allMovies: Movie[], media: Movie) {
    const movieIndex = allMovies.findIndex((movie: Movie) => movie.id === media.id)
    if (movieIndex !== -1) {
      allMovies[movieIndex] = media
    } else {
      allMovies.push(media)
    }

    return allMovies
  }
}
