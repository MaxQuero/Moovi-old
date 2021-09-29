import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieModelService } from '../helpers/movie.model.service';
import { HelpersService } from '../helpers/helpers.service';

@Controller('movie')
export class MovieController {
  constructor(
    private movieService: MovieService,
    private movieModelService: MovieModelService,
    private helpersService: HelpersService
  ) {
  }

  // Get popular movies
  @Get('popular')
  async getPopularMoviesAction() {
    return this.movieService.getPopularMovies();
  }

  // Get trendings medias
  @Get('trending')
  async getTrendingsMedias() {
    return this.movieService.getTrendingMedias();
  }

  // get movies in theatres
  @Get('in-theatres')
  async getInTheatresMovies() {
    return this.movieService.getTheatresMovies();
  }

  // Get upcoming movies
  @Get('upcoming')
  async getUpcomingMovies() {
    return this.movieService.getUpcomingMovies();
  }


  @Post('search')
  getMovieResults(@Body() body) {
    console.log('watchlist');
    const { query, page } = body;
    return this.movieService.searchMovies(query, page);
  }


  @Post('watchlist')
  getMovieWatchlist(@Body() body) {
    const { accountId, sessionId, page} = body;
    return this.movieService.getMovieWatchlist(accountId, sessionId, page);
  }

  // Fetch a particular post using ID
  @Post(':id')
  getMovieDetails(@Body() body, @Param() params) {
    const { sessionId } = body;
    return this.movieService.getMovieDetailsFromId(params.id, sessionId);
  }


  @Post(':id/rate')
  async rateMovieAction(@Body() body, @Param() params) {
    const { rating, sessionId, movie } = body;
    const movieId = params.id;

      const res = await this.movieService.rateMovie(movieId, rating, sessionId);
      await this.movieService.patchRatings(movie, rating);
      await this.movieService.refreshMovies();
      return JSON.stringify(res);
  }

  @Post(':id/favorite')
  async setToFavoritesMovieAction(@Body() body, @Param() params) {
    const { accountId, sessionId, movie, isFavorite } = body;
    const movieId = params.id;

    const res = await this.movieService.setToFavoriteMovie(accountId, sessionId, 'movie', movieId, isFavorite);
    try {
      await this.movieService.patchFavorites(movie, isFavorite);
      await this.movieService.refreshMovies();
      return JSON.stringify(res);
    } catch {
      return (err => err.message);
    }
  }

  @Post(':id/watchlist')
  async setToWatchlist(@Body() body, @Param() params): Promise<any> {
    const { sessionId, media, mediaType, isWatchlisted } = body;
    const accountId = params.id;
    const res = await this.helpersService.addToWatchlist(accountId, sessionId, mediaType, media.id, isWatchlisted);
    await this.movieService.patchWatchlist(media, isWatchlisted);
    await this.movieService.refreshMovies();

    return JSON.stringify(res);
  }
}
