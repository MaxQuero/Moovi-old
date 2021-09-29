import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { AppConstants } from '../app.constants';
import { MovieInterface } from './interfaces/movie.interface';
import { HelpersService } from '../helpers/helpers.service';
import { MovieModelService } from '../helpers/movie.model.service';

@Injectable()
export class MovieService {
  allMovies: MovieInterface[];

  constructor(
    private httpService: HttpService,
    private movieModelService: MovieModelService,
    private helpersService: HelpersService,
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
    const newArr = [...allMovies];
    this.allMovies = newArr;
  }


  /**
   * Get trending medias
   */
  async getTrendingMedias() {
    const movieUrl = `${AppConstants.API_DEFAULT}/trending/all/week?api_key=${AppConstants.API_KEY}&language=fr-FR&region=FR`;
    const res = await this.helpersService.makeGetHttpRequest(movieUrl);
    return await Promise.all(res.data.results.map(async (movie, i) => {
      return this.processData(movie, this.allMovies);
    }));
  }


  /**
   * Get popular movies
   */
  async getPopularMovies() {
    const movieUrl = `${AppConstants.API_DEFAULT}/movie/popular?api_key=${AppConstants.API_KEY}&language=fr-FR&region=FR`;
    const res = await this.helpersService.makeGetHttpRequest(movieUrl);
    return await Promise.all(res.data.results.map(async (movie, i) => {
      const movieImagesUrl = `${AppConstants.API_DEFAULT}/movie/${movie.id}/images?api_key=${AppConstants.API_KEY}&language=fr&include_image_language=fr,en`;

      const response = await this.httpService.get(movieImagesUrl).toPromise();
      movie.images = response.data;
      return this.processData(movie, this.allMovies);
    }));
  }

  /**
   * Get in theatres movies
   */
  async getTheatresMovies() {
    const movieUrl = `${AppConstants.API_DEFAULT}/movie/now_playing?api_key=${AppConstants.API_KEY}&language=fr-FR&region=FR`;
    const res = await this.helpersService.makeGetHttpRequest(movieUrl);
    return await Promise.all(res.data.results.map(async (movie, i) => {
      const movieImagesUrl = `${AppConstants.API_DEFAULT}/movie/${movie.id}/images?api_key=${AppConstants.API_KEY}&language=fr&include_image_language=fr,en`;

      const response = await this.httpService.get(movieImagesUrl).toPromise();
      movie.images = response.data;
      return this.processData(movie, this.allMovies);
    }));
  }


  /**
   * Get upcoming movies
   */
  async getUpcomingMovies() {
    const movieUrl = `${AppConstants.API_DEFAULT}/movie/upcoming?api_key=${AppConstants.API_KEY}&language=fr-FR&region=FR`;
    const res = await this.helpersService.makeGetHttpRequest(movieUrl);
    return await Promise.all(res.data.results.map(async (movie, i) => {
      const movieImagesUrl = `${AppConstants.API_DEFAULT}/movie/${movie.id}/images?api_key=${AppConstants.API_KEY}&language=fr&include_image_language=fr,en`;

      const response = await this.helpersService.makeGetHttpRequest(movieImagesUrl);
      movie.images = response.data;
      return this.processData(movie, this.allMovies);
    }));
  }


  /**
   * Get movie details
   */
  async getMovieDetailsFromId(movieId: string, sessionId: string) {
    const movieUrl = `${AppConstants.API_DEFAULT}/movie/${movieId}?api_key=${AppConstants.API_KEY}&session_id=${sessionId}&language=fr&append_to_response=videos,credits,recommendations,translations,account_states,images&include_video_language=fr,en&include_image_language=fr,en`;
    const res = await this.helpersService.makeGetHttpRequest(movieUrl);
    return this.processData(res.data, this.allMovies);
  }

  /**
   * Get movie watchlist
   */
  async getMovieWatchlist(accountId: number, sessionId: string, page:number) {
    const movieWatchlistUrl = `${AppConstants.API_DEFAULT}/account/${accountId}/watchlist/movies?api_key=${AppConstants.API_KEY}&session_id=${sessionId}&language=fr&page=${page}`;
    const res = await this.helpersService.makeGetHttpRequest(movieWatchlistUrl);
    return await Promise.all(res.data.results.map(async (movie, i) => {
      return this.processData(movie, this.allMovies);
    }));
  }

  /**
   * Search movie
   */
  async searchMovies(query: string, page = 1) {
    const searchMoviesUrl = `${AppConstants.API_DEFAULT}/search/movie?api_key=${AppConstants.API_KEY}&language=fr-FR&query=${query}&page=${page}`;
    const res: any = await this.helpersService.makeGetHttpRequest(searchMoviesUrl);
    return await Promise.all(res.data.results.map(async (movie, i) => {
      return this.processData(movie, this.allMovies);
    }));
  }

  /**
   * Rate movie
   */
  async rateMovie(movieId, note, sessionId ?: string) {
    let rateMovieUrl = `${AppConstants.API_DEFAULT}/movie/${movieId}/rating?api_key=${AppConstants.API_KEY}&session_id=${sessionId}`;
    rateMovieUrl += sessionId ? '&session_id=' + sessionId : '';
    const res = await this.helpersService.makePostHttpRequest(rateMovieUrl,
      { value: note }
    );
      return res.data;
  }

  async setToFavoriteMovie(accountId: number, sessionId: string, mediaType: any, mediaId: number, isFavorite: boolean) {
    const setToFavoriteMoviesUrl = `${AppConstants.API_DEFAULT}/account/${accountId}/favorite?api_key=${AppConstants.API_KEY}&session_id=${sessionId}`;


    try {
      const res = await this.helpersService.makePostHttpRequest(setToFavoriteMoviesUrl,
        {
          'media_type': mediaType,
          'media_id': mediaId,
          'favorite': isFavorite,
        });
      return res.data;
    }
    catch(err) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

  }

  async patchRatings(movie: MovieInterface, rating: number) {
    await this.movieModelService.saveRatings(movie, rating);
  }

  async patchFavorites(movie: MovieInterface, isFavorite: boolean) {
    await this.movieModelService.saveFavorites(movie, isFavorite);
  }

  async patchWatchlist(movie: MovieInterface, isWatchListed: boolean) {
    await this.movieModelService.saveIsWatchlist(movie, isWatchListed);
  }

  async refreshMovies() {
    const allMovies = await this.movieModelService.getAllMovies();

    this.setAllMovies(allMovies);
    return allMovies;
  }


  processData(movie, allMovies: any): any {
    const trailer = (language) => (video) => (video.site === "Youtube" && (video.type === "Trailer" && video.iso_639_1 === language));
    const directors = crewPeople => crewPeople.job === "Director";
    const translation = movie.translations && movie?.translations?.translations.find((movieTranslation) => {
      return movieTranslation.name === "English";
    }).data;
    const logo = (language) => (logo) => logo.iso_639_1 === language;
    const { movieRating, movieFavorites, movieIsWatchlist } = this.movieModelService.getMovieAccountStates(movie, allMovies);

    return {
      id: movie.id,
      genres: movie.genres,
      originalTitle: movie.original_title,
      title: movie.title,
      releaseDate: movie.release_date,
      runtime: movie.runtime,
      status: movie.status,
      tagline: movie.tagline || translation?.tagline,
      poster: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie.poster_path,
      popularity: movie.popularity,
      voteAverage: Math.round(movie.vote_average * 10) / 10,
      voteCount: movie.vote_count,
      synopsis: movie.overview || translation?.overview,
      backdropCover: 'https://image.tmdb.org/t/p/t/p/w1920_and_h800_multi_faces' + movie.backdrop_path,
      trailer: movie?.videos?.results && (movie?.videos.results.find(trailer('fr')) || movie?.videos.results.find(trailer('en'))),
      actors: movie?.credits?.cast,
      directors: movie?.credits?.crew && movie.credits.crew.filter(directors),
      recommendations: movie?.recommendations?.results && movie.recommendations.results.map(movie => this.processData(movie, allMovies)),
      rating: movieRating,
      favorite: movieFavorites,
      watchlist: movieIsWatchlist,
      logo: movie?.images?.logos.find(logo('fr')) || movie?.images?.logos.find(logo('en'))
    };

  }
}
