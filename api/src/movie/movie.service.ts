import { Injectable } from '@nestjs/common';
import { MovieModelService } from '../helpers/movie.model.service';
import { MovieInterface } from './interfaces/movie.interface';

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

  setOrUpdateMovieToList(allMovies: MovieInterface[], media: MovieInterface) {
    const movieIndex = allMovies.findIndex((movie: MovieInterface) => movie.id === media.id)
    if (!!movieIndex) {
      allMovies[movieIndex] = media
    } else {
      allMovies.push(media)
    }

    return allMovies
  }
}
