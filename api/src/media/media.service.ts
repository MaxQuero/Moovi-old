import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { AppConstants } from '../app.constants';
import { MediaInterface } from './interfaces/media.interface';
import { HelpersService } from '../helpers/helpers.service';
import { MediaEnum } from './dto/media.dto';
import { TvShowService } from '../tvShow/tvShow.service';
import { MovieService } from '../movie/movie.service';
import { MovieInterface } from '../movie/interfaces/movie.interface';
import { MovieModelService } from '../helpers/movie.model.service';
import { TvShowModelService } from '../helpers/tvShow.model.service';
import { TvShowInterface } from '../tvShow/interfaces/tvShow.interface';

@Injectable()
export class MediaService {
  allMedia: MediaInterface[];
  allMovies: MovieInterface[];
  allTvShows: TvShowInterface[];

  constructor(
    private httpService: HttpService,
    private movieModelService: MovieModelService,
    private movieService: MovieService,
    private tvShowService: TvShowService,
    private tvShowModelService: TvShowModelService,
    private helpersService: HelpersService,
  ) {
    (async () => {
      this.allMovies = await this.movieService.getAllMovies();
      this.allTvShows = await this.tvShowService.getAllTvShows();
    })();
  }

  /**
   * Get trending medias
   */
  async getTrendingMedias(mediaType: MediaEnum) {
    let medias, trendingMedias;
    if (mediaType === MediaEnum.Movie) {
      trendingMedias = `${AppConstants.API_DEFAULT}/trending/movie/week?api_key=${AppConstants.API_KEY}&language=fr-FR&region=FR`;
      medias = this.allMovies;
    } else if (mediaType === MediaEnum.Tv) {
      trendingMedias = `${AppConstants.API_DEFAULT}/trending/tv/week?api_key=${AppConstants.API_KEY}&language=fr-FR&region=FR`;
      medias = this.allMovies;
    } else {
      trendingMedias =  `${AppConstants.API_DEFAULT}/trending/all/week?api_key=${AppConstants.API_KEY}&language=fr-FR&region=FR`;
      medias = [...this.allMovies, ...this.allTvShows];
    }

    const res = await this.helpersService.makeGetHttpRequest(trendingMedias);
    return await Promise.all(res.data.results.map(async (media, i) => {
      return this.processData(media, medias);
    }));


    return medias;
  };


  /**
   * Get popular media
   */
  async getPopularMedias(mediaType: string) {
    let medias, urlMediaType, popularMedias;

    if (mediaType === MediaEnum.Movie) {
      popularMedias = `${AppConstants.API_DEFAULT}/movie/popular?api_key=${AppConstants.API_KEY}&language=fr-FR&region=FR`;
      urlMediaType = "movie";
      medias = this.allMovies;
    } else if (mediaType === MediaEnum.Tv) {
      popularMedias = `${AppConstants.API_DEFAULT}/tv/popular?api_key=${AppConstants.API_KEY}&language=fr-FR`;
      urlMediaType = "tv";
      medias = this.allTvShows;
    }

    const res = await this.helpersService.makeGetHttpRequest(popularMedias);
    return await Promise.all(res.data.results.map(async (media, i) => {
      const mediaImagesUrl = `${AppConstants.API_DEFAULT}/${urlMediaType}/${media.id}/images?api_key=${AppConstants.API_KEY}&language=fr&include_image_language=fr,en`;

      const response = await this.helpersService.makeGetHttpRequest(mediaImagesUrl);
      media.images = response.data;
      return this.processData(media, medias);
    }));
  }


  /**
   * Get on the air media
   */
  async getOnTheAirMedias(mediaType: string) {
    let medias, urlMediaType, onTheAirMediasUrl;

    if (mediaType === MediaEnum.Movie) {
      onTheAirMediasUrl = `${AppConstants.API_DEFAULT}/movie/now_playing?api_key=${AppConstants.API_KEY}&language=fr-FR&region=FR`;
      urlMediaType = "movie";
      medias = this.allMovies;
    } else if (mediaType === MediaEnum.Tv) {
      onTheAirMediasUrl = `${AppConstants.API_DEFAULT}/tv/on_the_air?api_key=${AppConstants.API_KEY}&language=fr-FR&region=FR`;
      urlMediaType = "tv";
      medias = this.allTvShows;
    }

    const res = await this.helpersService.makeGetHttpRequest(onTheAirMediasUrl);
    return await Promise.all(res.data.results.map(async (media, i) => {
      const mediaImagesUrl = `${AppConstants.API_DEFAULT}/${urlMediaType}/${media.id}/images?api_key=${AppConstants.API_KEY}&language=fr&include_image_language=fr,en`;

      const response = await this.helpersService.makeGetHttpRequest(mediaImagesUrl);
      media.images = response.data;
      return this.processData(media, medias);
    }));
  }

  /**
   * Get latest media
   */
  async getLatestMedias(mediaType) {
    let medias, urlMediaType, latestMediasUrl;

    if (mediaType === MediaEnum.Movie) {
      latestMediasUrl = `${AppConstants.API_DEFAULT}/movie/upcoming?api_key=${AppConstants.API_KEY}&language=fr-FR&region=FR`;
      urlMediaType = "movie";
      medias = this.allMovies;
    } else if (mediaType === MediaEnum.Tv) {
      latestMediasUrl = `${AppConstants.API_DEFAULT}/tv/airing_today?api_key=${AppConstants.API_KEY}&language=fr`;
      urlMediaType = "tv";
      medias = this.allTvShows;
    }

    const res = await this.helpersService.makeGetHttpRequest(latestMediasUrl);
    return await Promise.all(res.data.results.map(async (media, i) => {
      const mediaImagesUrl = `${AppConstants.API_DEFAULT}/${urlMediaType}/${media.id}/images?api_key=${AppConstants.API_KEY}&language=fr&include_image_language=fr,en`;

      const response = await this.helpersService.makeGetHttpRequest(mediaImagesUrl);
      media.images = response.data;
      return this.processData(media, medias);
    }));
  }

  /**
   * Get media details
   */
  async getMediaDetailsFromId(mediaId: string, mediaType: MediaEnum, sessionId: string) {
    let medias;
    let mediaDetailsUrl;
    if (mediaType === MediaEnum.Movie) {
      mediaDetailsUrl = `${AppConstants.API_DEFAULT}/movie/${mediaId}?api_key=${AppConstants.API_KEY}&session_id=${sessionId}&language=fr&append_to_response=videos,credits,recommendations,translations,account_states,images&include_video_language=fr,en&include_image_language=fr,en`;
      medias = this.allMovies;

    } else if (mediaType === MediaEnum.Tv) {
      mediaDetailsUrl = `${AppConstants.API_DEFAULT}/tv/${mediaId}?api_key=${AppConstants.API_KEY}&session_id=${sessionId}&language=fr&append_to_response=videos,credits,recommendations,translations,account_states,images&include_video_language=fr,en&include_image_language=fr,en`;
      medias = this.allTvShows;
    }


    const res = await this.helpersService.makeGetHttpRequest(mediaDetailsUrl);

    return this.processData(res.data, medias);
  }

  /**
   * Get media watchlist
   */
  async getMediaWatchlist(mediaType: MediaEnum, accountId: number, sessionId: string, page: number) {
    let medias;
    let mediasWatchlistUrl;
    if (mediaType === MediaEnum.Movie) {
      mediasWatchlistUrl = `${AppConstants.API_DEFAULT}/account/${accountId}/watchlist/movies?api_key=${AppConstants.API_KEY}&session_id=${sessionId}&language=fr&page=${page}`;
      medias = this.allMovies;
    } else if (mediaType === MediaEnum.Tv) {
      mediasWatchlistUrl = `${AppConstants.API_DEFAULT}/account/${accountId}/watchlist/tv?api_key=${AppConstants.API_KEY}&session_id=${sessionId}&language=fr&page=${page}`;
      medias = this.allTvShows;
    }

    const res = await this.helpersService.makeGetHttpRequest(mediasWatchlistUrl);

    return await Promise.all(res.data.results.map(async (tvShow, i) => {
      return this.processData(tvShow, medias);
    }));
  }

  /**
   * Search media
   */
  async searchMedias(mediaType: MediaEnum, query: string, page = 1) {
    let medias;
    let searchUrl;
    if (mediaType === MediaEnum.Movie) {
      searchUrl = `${AppConstants.API_DEFAULT}/search/movie?api_key=${AppConstants.API_KEY}&language=fr-FR&query=${query}&page=${page}`;
      medias = this.allMovies;
    } else if (mediaType === MediaEnum.Tv) {
      searchUrl = `${AppConstants.API_DEFAULT}/search/tv/api_key=${AppConstants.API_KEY}&language=fr-FR&query=${query}&page=${page}`;
      medias = this.allTvShows;
    }

    const res: any = await this.helpersService.makeGetHttpRequest(searchUrl);

    return await Promise.all(res.data.results.map(async (movie, i) => {
      return this.processData(movie, medias);
    }));
  }

  /**
   * Rate media
   */
  async rateMedia(media, note, sessionId ?: string) {
    let rateUrl;
    if (media.type === MediaEnum.Movie) {
      rateUrl = `${AppConstants.API_DEFAULT}/movie/${media.id}/rating?api_key=${AppConstants.API_KEY}&session_id=${sessionId}`;
    } else if (media.type === MediaEnum.Tv) {
      rateUrl = `${AppConstants.API_DEFAULT}/tv/${media.id}/rating?api_key=${AppConstants.API_KEY}&session_id=${sessionId}`;
    }
    rateUrl += sessionId ? '&session_id=' + sessionId : '';
    const res = await this.helpersService.makePostHttpRequest(rateUrl,
      { value: note },
    );
    return res.data;
  }

  async setToFavoriteMedia(media, isFavorite: boolean, accountId: number, sessionId: string) {
    const setToFavoriteUrl = `${AppConstants.API_DEFAULT}/account/${accountId}/favorite?api_key=${AppConstants.API_KEY}&session_id=${sessionId}`;

    try {
      const res = await this.helpersService.makePostHttpRequest(setToFavoriteUrl,
        {
          'media_type': media.type,
          'media_id': media.id,
          'favorite': isFavorite,
        });
      return res.data;
    } catch (err) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }


  async patchRatings(media, rating: number) {
    if (media.type === MediaEnum.Movie) {
      await this.movieModelService.saveRatings(media, rating);
    } else if (media.type === MediaEnum.Tv) {
      await this.tvShowModelService.saveRatings(media, rating);
    }
  }

  async patchFavorites(media, isFavorite: boolean) {

    if (media.type === MediaEnum.Movie) {
      await this.movieModelService.saveFavorites(media, isFavorite);
    } else if (media.type === MediaEnum.Tv) {
      await this.tvShowModelService.saveFavorites(media, isFavorite);
    }
  }

  async patchWatchlist(media, isWatchListed: boolean) {
    if (media.type === MediaEnum.Movie) {
      await this.movieModelService.saveIsWatchlist(media, isWatchListed);
    } else if (media.type === MediaEnum.Tv) {
      await this.tvShowModelService.saveIsWatchlist(media, isWatchListed);
    }
  }

  getDirectors(media) {
    const directors = crewPeople => crewPeople.job === 'Director';

    if(media.created_by) {
      return media?.created_by;
    } else {
      return media?.credits?.crew && media.credits.crew.filter(directors)
    }
  }

  processData(media, allMedias: any): any {
    const trailer = (language) => (video) => (video.site === 'Youtube' && (video.type === 'Trailer' && video.iso_639_1 === language));
    const translation = media.translations && media?.translations?.translations.find((mediaTranslation) => {
      return mediaTranslation.name === 'English';
    }).data;

    const logo = (language) => (logo) => logo.iso_639_1 === language;
    const { mediaRating, mediaFavorites, mediaIsWatchlist } = this.getMediaAccountStates(media, allMedias);

    return {
      id: media.id,
      type: media.title ? MediaEnum.Movie : MediaEnum.Tv,
      genres: media.genres,
      originalTitle: media.original_title || media.original_name,
      title: media.title || media.name,
      releaseDate: media.release_date || media.first_air_date,
      runtime: media.runtime || (media?.episode_run_time && media.episode_run_time[0]),
      seasons: media.seasons,
      status: media.status,
      tagline: media.tagline || translation?.tagline,
      poster: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + media.poster_path,
      popularity: media.popularity,
      voteAverage: Math.round(media.vote_average * 10) / 10,
      voteCount: media.vote_count,
      synopsis: media.overview || translation?.overview,
      backdropCover: 'https://image.tmdb.org/t/p/t/p/w1920_and_h800_multi_faces' + media.backdrop_path,
      trailer: media?.videos?.results && (media?.videos.results.find(trailer('fr')) || media?.videos.results.find(trailer('en'))),
      actors: media?.credits?.cast,
      directors: this.getDirectors(media),
      recommendations: media?.recommendations?.results && media.recommendations.results.map(media => this.processData(media, allMedias)),
      rating: mediaRating,
      favorite: mediaFavorites,
      watchlist: mediaIsWatchlist,
      logo: media?.images?.logos.find(logo('fr')) || media?.images?.logos.find(logo('en')),
    };
  }

  /**
   * Get tvShow rating
   */
  getMediaAccountStates(media: any, allMedias: any) {
    const mediaDb = (!media?.rating || !media?.favorite || !media?.watchlist) && allMedias.find(el => el.id === media.id);

    const mediaRating = media?.rating || mediaDb?.rating || media?.account_states?.rated?.value;
    const mediaFavorites = media?.favorite || mediaDb?.favorite || media?.account_states?.favorite;
    const mediaIsWatchlist = media?.watchlist || mediaDb?.watchlist || media?.account_states?.watchlist;

    return { mediaRating, mediaFavorites, mediaIsWatchlist };
  }


  async refreshMedias() {
    const allMovies = await this.movieModelService.getAllMovies();
    const allTvShows = await this.tvShowModelService.getAllTvShows();

    this.allMovies = this.movieService.setAllMovies(allMovies);
    this.allTvShows = this.tvShowService.setAllTvShows(allTvShows);

    return allMovies;
  }

}
