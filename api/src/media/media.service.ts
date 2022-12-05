import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus, Injectable, UseInterceptors } from '@nestjs/common';
import { HelpersService } from '../helpers/helpers.service';
import { MediaEnum } from './dto/media.dto';
import { TvShowService } from '../tvShow/tvShow.service';
import { MovieService } from '../movie/movie.service';
import { MovieModelService } from '../helpers/movie.model.service';
import { TvShowModelService } from '../helpers/tvShow.model.service';
import { EpisodeModelService } from '../helpers/episode.model.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EpisodeService } from '../episode/episode.service';
import { Movie } from '../movie/models/movie.model';
import { TvShow } from '../tvShow/models/tvShow.model';
import { Episode } from '../episode/models/episode.model';

@Injectable()
export class MediaService {
  allMovies: Movie[]
  allTvShows: TvShow[]
  allEpisodes: Episode[]
  constructor(
    private httpService: HttpService,
    private movieModelService: MovieModelService,
    private movieService: MovieService,
    private tvShowService: TvShowService,
    private episodeService: EpisodeService,
    private tvShowModelService: TvShowModelService,
    private helpersService: HelpersService,
    private episodeModelService: EpisodeModelService,
    @InjectModel('Episode') private readonly episodeModel: Model<Episode>,
) {
    (async () => {
      this.allMovies = await this.movieService.getAllMoviesFromDb();
      this.allTvShows = await this.tvShowService.getAllTvShowsFromDb();
      this.allEpisodes = await this.episodeService.getAllEpisodesFromDb();
    })();
  }

  /**
   * Get trending medias
   */
  async getTrendingMedias(mediaType: MediaEnum) {
    let medias, trendingMedias;
    if (mediaType === MediaEnum.Movie) {
      trendingMedias = `${process.env.API_DEFAULT}/trending/movie/week?api_key=${process.env.API_KEY}&language=fr-FR&region=FR`;
      medias = this.allMovies;
    } else if (mediaType === MediaEnum.Tv) {
      trendingMedias = `${process.env.API_DEFAULT}/trending/tv/week?api_key=${process.env.API_KEY}&language=fr-FR&region=FR`;
      medias = this.allTvShows;
    } else {
      trendingMedias =  `${process.env.API_DEFAULT}/trending/all/week?api_key=${process.env.API_KEY}&language=fr-FR&region=FR`;
      medias = [...this.allMovies, ...this.allTvShows];
    }

    const res = await this.helpersService.makeGetHttpRequest(trendingMedias);
    return await Promise.all(res.data.results.map(async (media, i) => {
      return this.processData(media, medias);
    }));
  };


  /**
   * Get popular media
   */
  async getPopularMedias(mediaType: string) {
    let medias, urlMediaType, popularMedias;

    if (mediaType === MediaEnum.Movie) {
      popularMedias = `${process.env.API_DEFAULT}/movie/popular?api_key=${process.env.API_KEY}&language=fr-FR&region=FR`;
      urlMediaType = "movie";
      medias = this.allMovies;
    } else if (mediaType === MediaEnum.Tv) {
      popularMedias = `${process.env.API_DEFAULT}/tv/popular?api_key=${process.env.API_KEY}&language=fr-FR`;
      urlMediaType = "tv";
      medias = this.allTvShows;
    }

    const res = await this.helpersService.makeGetHttpRequest(popularMedias);

    //TODO :: alleger cet appel a l'origine des lenteurs
    return await Promise.all(res.data.results.map(async (media, i) => {
      const mediaImagesUrl = `${process.env.API_DEFAULT}/${urlMediaType}/${media.id}/images?api_key=${process.env.API_KEY}&language=fr&include_image_language=fr,en`;

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
      onTheAirMediasUrl = `${process.env.API_DEFAULT}/movie/now_playing?api_key=${process.env.API_KEY}&language=fr-FR&region=FR`;
      urlMediaType = "movie";
      medias = this.allMovies;
    } else if (mediaType === MediaEnum.Tv) {
      onTheAirMediasUrl = `${process.env.API_DEFAULT}/tv/on_the_air?api_key=${process.env.API_KEY}&language=fr-FR&region=FR`;
      urlMediaType = "tv";
      medias = this.allTvShows;
    }

    const res = await this.helpersService.makeGetHttpRequest(onTheAirMediasUrl);
    return await Promise.all(res.data.results.map(async (media, i) => {
      const mediaImagesUrl = `${process.env.API_DEFAULT}/${urlMediaType}/${media.id}/images?api_key=${process.env.API_KEY}&language=fr&include_image_language=fr,en`;

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
      latestMediasUrl = `${process.env.API_DEFAULT}/movie/upcoming?api_key=${process.env.API_KEY}&language=fr-FR&region=FR`;
      urlMediaType = "movie";
      medias = this.allMovies;
    } else if (mediaType === MediaEnum.Tv) {
      latestMediasUrl = `${process.env.API_DEFAULT}/tv/airing_today?api_key=${process.env.API_KEY}&language=fr`;
      urlMediaType = "tv";
      medias = this.allTvShows;
    }

    const res = await this.helpersService.makeGetHttpRequest(latestMediasUrl);
    return await Promise.all(res.data.results.map(async (media, i) => {
      const mediaImagesUrl = `${process.env.API_DEFAULT}/${urlMediaType}/${media.id}/images?api_key=${process.env.API_KEY}&language=fr&include_image_language=fr,en`;

      const response = await this.helpersService.makeGetHttpRequest(mediaImagesUrl);
      media.images = response.data;
      return this.processData(media, medias);
    }));
  }

  /**
   * Get media details
   */
  async getMediaDetailsFromId(mediaId: number, mediaType: MediaEnum, sessionId: string) {
    let mediaDetailsUrl;
    if (mediaType === MediaEnum.Movie) {
      mediaDetailsUrl = `${process.env.API_DEFAULT}/movie/${mediaId}?api_key=${process.env.API_KEY}&session_id=${sessionId}&language=fr&append_to_response=videos,credits,recommendations,translations,account_states,images&include_video_language=fr,en&include_image_language=fr,en`;
      const res = await this.helpersService.makeGetHttpRequest(mediaDetailsUrl);
      return this.processData(res.data, this.allMovies);
    } else if (mediaType === MediaEnum.Tv) {
      mediaDetailsUrl = `${process.env.API_DEFAULT}/tv/${mediaId}?api_key=${process.env.API_KEY}&session_id=${sessionId}&language=fr&append_to_response=videos,credits,recommendations,translations,account_states,images,season/1&include_video_language=fr,en&include_image_language=fr,en`;
      const res = await this.helpersService.makeGetHttpRequest(mediaDetailsUrl);
      return this.processData(res.data, this.allTvShows, this.allEpisodes);
    }
  }
  /**
   * Get media season details
   */
  async getSeasonDetailsFromMediaId(mediaId: number, seasonNumber: number, sessionId: string) {
    const mediaSeasonsUrl = `${process.env.API_DEFAULT}/tv/${mediaId}/season/${seasonNumber}?api_key=${process.env.API_KEY}&session_id=${sessionId}&language=fr-FR&append_to_response=credits,translations,account_states,images&include_image_language=fr,en`;
    const res = await this.helpersService.makeGetHttpRequest(mediaSeasonsUrl);
    //Todo ProcessEpisode Rating

    const season = {...res.data}
    const episodesRated = season.episodes.map(episode =>
      ({
        ...episode,
        rating: this.allEpisodes.find(el => el.id === episode.id)?.rating
      }))

    return  {...season, episodes: episodesRated};
  }
  /**
   * Get media watchlist
   */
  async getMediaWatchlist(mediaType: MediaEnum, accountId: number, sessionId: string, page: number) {
    let medias;
    let mediasWatchlistUrl;
    if (mediaType === MediaEnum.Movie) {
      mediasWatchlistUrl = `${process.env.API_DEFAULT}/account/${accountId}/watchlist/movies?api_key=${process.env.API_KEY}&session_id=${sessionId}&language=fr&page=${page}`;
      medias = this.allMovies;
    } else if (mediaType === MediaEnum.Tv) {
      mediasWatchlistUrl = `${process.env.API_DEFAULT}/account/${accountId}/watchlist/tv?api_key=${process.env.API_KEY}&session_id=${sessionId}&language=fr&page=${page}`;
      medias = this.allTvShows;
    }

    const res = await this.helpersService.makeGetHttpRequest(mediasWatchlistUrl);

    return await Promise.all(res.data.results.map(async (media, i) => {
      return this.processData(media, medias);
    }));
  }

  /**
   * Search media
   */
  async searchMedias(mediaType: MediaEnum, query: string, page = 1) {
    let medias;
    let searchUrl;
    if (mediaType === MediaEnum.Movie) {
      searchUrl = `${process.env.API_DEFAULT}/search/movie?api_key=${process.env.API_KEY}&language=fr-FR&query=${query}&page=${page}`;
      medias = this.allMovies;
    } else if (mediaType === MediaEnum.Tv) {
      searchUrl = `${process.env.API_DEFAULT}/search/tv?api_key=${process.env.API_KEY}&language=fr-FR&query=${query}&page=${page}`;
      medias = this.allTvShows;
    } else if (mediaType === MediaEnum.All) {
      searchUrl = `${process.env.API_DEFAULT}/search/multi?api_key=${process.env.API_KEY}&language=fr-FR&query=${query}&page=${page}`;
      medias = [...this.allMovies, ...this.allTvShows];
    }

    const res: any = await this.helpersService.makeGetHttpRequest(searchUrl);

    return await Promise.all(res.data.results.map(async (media, i) => {
      return this.processData(media, medias);
    }));
  }

  /**
   * Rate media
   */
  async rateMedia(media, sessionId ?: string) {
    let rateUrl;
    if (media.type === MediaEnum.Movie) {
      rateUrl = `${process.env.API_DEFAULT}/movie/${media.id}/rating?api_key=${process.env.API_KEY}&session_id=${sessionId}`;
    } else if (media.type === MediaEnum.Tv) {
      rateUrl = `${process.env.API_DEFAULT}/tv/${media.id}/rating?api_key=${process.env.API_KEY}&session_id=${sessionId}`;
    }
    rateUrl += sessionId ? '&session_id=' + sessionId : '';
    const res = await this.helpersService.makePostHttpRequest(rateUrl,
      { value: media?.rating },
    );
    return res.data;
  }

  /**
   * Rate episode
   */
  async rateEpisode(mediaId, seasonNumber, episodeNumber, note, sessionId ?: string) {
    let rateUrl;
    rateUrl = `${process.env.API_DEFAULT}/tv/${mediaId}/season/${seasonNumber}/episode/${episodeNumber}/rating?api_key=${process.env.API_KEY}&session_id=${sessionId}`;
    rateUrl += sessionId ? '&session_id=' + sessionId : '';
    const res = await this.helpersService.makePostHttpRequest(rateUrl,
      { value: note },
    );
    return res.data
      ;
  }


  async setToFavoriteMedia(media, accountId: number, sessionId: string) {
    const setToFavoriteUrl = `${process.env.API_DEFAULT}/account/${accountId}/favorite?api_key=${process.env.API_KEY}&session_id=${sessionId}`;

    try {
      const res = await this.helpersService.makePostHttpRequest(setToFavoriteUrl,
        {
          'media_type': media.type,
          'media_id': media.id,
          'favorite': media?.favorite,
        });
      return res.data;
    } catch (err) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }


  async patchRatings(media) {
    if (media.type === MediaEnum.Movie) {
      await this.movieModelService.saveRatings(media);
    } else if (media.type === MediaEnum.Tv) {
      await this.tvShowModelService.saveRatings(media);
    }
  }

  async patchEpisodeRatings(episodeId: number, seasonNumber: number, episodeNumber: number, rating: number) {
      await this.episodeModelService.saveEpisodeRatings(episodeId, seasonNumber, episodeNumber, rating);
  }

  //TODO : refacto avec rating et wathclist + pour movie et rtvshow (et season et episode?) -> quasi les memes fonctions
  async patchFavorites(media) {

    if (media.type === MediaEnum.Movie) {
      await this.movieModelService.saveFavorites(media);
    } else if (media.type === MediaEnum.Tv) {
      await this.tvShowModelService.saveFavorites(media);
    }
  }

  async patchWatchlist(media) {
    if (media.type === MediaEnum.Movie) {
      await this.movieModelService.saveIsWatchlist(media);
    } else if (media.type === MediaEnum.Tv) {
      await this.tvShowModelService.saveIsWatchlist(media);
    }
  }

  getDirectors(media) {
    const directors = crewPeople => crewPeople.job === 'Director';
    return media?.credits?.crew && media.credits.crew.filter(directors)
  }

  async processData(media: any, allMedias: any, allEpisodes ?: Episode[]): Promise<any> {
    let processedSeasonsData = {}
    const processedMediaData = await this.processMediaData(media, allMedias)
    if (allEpisodes && allEpisodes.length > 0) {
      processedSeasonsData = this.processSeasonsData(media, allEpisodes);
    }

    const processedAccountData = await this.processAccountData(processedMediaData, allMedias)

    return {
      ...processedMediaData,
      ...processedSeasonsData,
      ...processedAccountData,
    }
  }


  async processMediaData(media, allMedias) {
    const trailer = (language) => (video) => (video.site === 'Youtube' && (video.type === 'Trailer' && video.iso6391 === language));
    const translation = media.translations && media?.translations?.translations.find((mediaTranslation) => {
      return mediaTranslation.name === 'English';
    }).data;
    const logo = (language) => (logo) => logo.iso6391 === language;

    return {
      id: media.id,
      type: media.title ? MediaEnum.Movie : MediaEnum.Tv,
      genres: media.genres,
      originalTitle: media.originalTitle || media.originalName,
      title: media.title || media.name,
      releaseDate: media.releaseDate || media.firstAirDate,
      runtime: media.runtime ?? (media?.EpisodeRunTime && media.EpisodeRunTime[0]),
      status: media.status,
      tagline: media.tagline || translation?.tagline,
      poster: media.posterPath ? 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + media.posterPath : null,
      popularity: media.popularity,
      voteAverage: Math.round(media.voteAverage * 10) / 10 || 0,
      voteCount: media.voteCount,
      synopsis: media.overview || translation?.overview,
      backdropCover:  media.backdropPath ? 'https://image.tmdb.org/t/p/t/p/w1920_and_h800_multi_faces' + media.backdropPath : null,
      trailer: media?.videos?.results && (media?.videos.results.find(trailer('fr')) || media?.videos.results.find(trailer('en'))),
      actors: media?.credits?.cast,
      directors: this.getDirectors(media),
      recommendations: media?.recommendations?.results && await Promise.all(media.recommendations.results.map(media => this.processData(media, allMedias))),
      logo: media?.images?.logos.find(logo('fr')) || media?.images?.logos.find(logo('en')),
    };
  }

  processSeasonsData(media, allEpisodes: Episode[]) {
    let seasons = []
    if (media?.seasons?.length > 0) {
      const seasonOne = media?.seasons?.findIndex(season => season?.seasonNumber === media['season1']?.seasonNumber)
      seasons = [...media?.seasons]
      seasons[seasonOne] = { ...media['season1'], ...seasons[seasonOne] }

      const episodesRated = seasons[seasonOne]['episodes'].map(episode =>
        ({
          ...episode,
          rating: allEpisodes?.find(el => (el.id === episode.id))?.rating
        })
      )
      seasons[seasonOne].episodes = episodesRated
    }

    return {
      seasons: seasons,
    }
  }


  async processAccountData(media, allMedias) {
    const { mediaRating, mediaFavorites, mediaIsWatchlist } = await this.getMediaAccountStates(media, allMedias);
    return {
      rating: mediaRating,
      favorite: mediaFavorites,
      watchlist: mediaIsWatchlist,
    }
  }

  /**
   * Get Media rating
   * TODO : Faire en sorte de n'executer cette fonction que si media et le type de AllMedias sont identique ?
   */
  getMediaAccountStates(media: Movie | TvShow, allMedias: any) {
    const mediaDb: any = (!media?.rating || !media?.favorite || !media?.watchlist) && allMedias.find(el => el.id === media.id);
    const mediaRating =  mediaDb?.rating
    const mediaFavorites =  mediaDb?.favorite
    const mediaIsWatchlist =  mediaDb?.watchlist

    return { mediaRating, mediaFavorites, mediaIsWatchlist };
  }

  async refreshMedias(media, mediaType) {
    switch (mediaType) {
      case MediaEnum?.Movie :
        this.allMovies = this.movieService.setOrUpdateMovieToList(this.allMovies, media)
        break
      case MediaEnum.Tv:
          this.allTvShows = this.tvShowService.setOrUpdateTvShowToList(this.allTvShows, media)
        break
      case 'episode' :
        this.allEpisodes = this.episodeService.setOrUpdateEpisodeToList(this.allEpisodes, media)
        break
    }
  }
}
