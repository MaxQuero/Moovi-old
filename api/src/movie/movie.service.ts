import { HttpService, Injectable } from '@nestjs/common';
import { MovieInterface } from './interfaces/movie.interface';
import { MovieModelService } from '../helpers/movie.model.service';

@Injectable()
export class MovieService {
  allMovies: MovieInterface[];

  constructor(
    private httpService: HttpService,
    private movieModelService: MovieModelService
  ) {
    (async () => {
        this.allMovies = await this.getAllMovies();
    })();
  }

  async getAllMovies() {
    let allMovies;
    if(!this.allMovies || this.allMovies.length === 0){
      allMovies = await this.movieModelService.getAllMovies();
    }
    return allMovies;
  }

  setAllMovies(allMovies) {
    return [...allMovies];
  }
}
