import { MediaEnum, MediaInterface } from '../interfaces/Media.interface';
import { MovieInterface } from '../interfaces/Movie.interface';
import { TvShowInterface } from '../interfaces/TvShow.interface';

const initialMedia = {
  id: 0,
  type: null,
  popularity: '',
  poster: '',
  title: '',
  synopsis: '',
  releaseDate: '',
  backdropCover: '',
  genres: [],
  originalTitle: '',
  runtime: 0,
  status: '',
  tagline: '',
  voteAverage: 0,
  voteCount: 0,
  trailer: {},
  actors: [],
  directors: [],
  recommendations: [],
  logo: {},
  rating: 0,
  favorite: false,
  watchlist: false,
  seasons: [],
  loading: false,
};

const INITIAL_STATE: {
  popularMedias: MediaInterface;
  mediaDetails: any;
  onTheAirMedias: MediaInterface;
  latestMedias: MediaInterface;
  trendingMedias: MediaInterface;
  mediasWatchlist: MediaInterface;
} = {
  popularMedias: { all: [], movie: [], tv: [], loading: false },
  mediaDetails: initialMedia,
  onTheAirMedias: { all: [], movie: [], tv: [], loading: false },
  latestMedias: { all: [], movie: [], tv: [], loading: false },
  trendingMedias: { all: [], movie: [], tv: [], loading: false },
  mediasWatchlist: { all: [], movie: [], tv: [], loading: false },
};

function MediasReducer(state: any = INITIAL_STATE, action: any) {
  const mediaType: any = action.payload && action.payload.type;
  switch (action.type) {
    case 'TOGGLE_LOADING': {
      const newArrState = { ...state };
      const newArrField = { ...state[action.payload.field], loading: true };
      newArrState[action.payload.field] = newArrField;

      return newArrState;
    }
    case 'GET_POPULAR_MEDIAS': {
      const newArrPopularMedias = { ...state.popularMedias, loading: false };
      newArrPopularMedias[action.payload.type] = action.payload.medias;
      return { ...state, popularMedias: newArrPopularMedias };
    }
    case 'GET_MEDIA': {
      const arrMedia = action.payload.media;
      return { ...state, mediaDetails: arrMedia, loading: false };
    }

    case 'GET_MEDIA_SEASON_DETAILS': {
      const arr = { ...state.mediaDetails };
      const seasonToModify = state?.mediaDetails?.seasons?.findIndex(
        (el: any) => el.season_number === action.payload.season.season_number,
      );
      arr.seasons[seasonToModify] = { ...action.payload.season, loading: false };

      return { ...state, mediaDetails: arr };
    }
    case 'UPDATE_MEDIA_RATING': {
      return {
        ...state,
        popularMedias: updateMediaProperty(state.popularMedias, 'rating', action.payload.media),
        latestMedias: updateMediaProperty(state.latestMedias, 'rating', action.payload.media),
        theatresMedias: updateMediaProperty(state.onTheAirMedias, 'rating', action.payload.media),
        trendingMedias: updateMediaProperty(state.trendingMedias, 'rating', action.payload.media),
        mediaDetails: {
          ...state.mediaDetails,
          rating: action.payload.media.rating,
          recommendations: updateMediaProperty(state.mediaDetails.recommendations, 'rating', action.payload.media),
        },
      };
    }
    case 'UPDATE_EPISODE_RATING': {
      return {
        ...state,
        mediaDetails: updateMediaDetailsProperty(
          { ...state.mediaDetails },
          action.payload.pathToProperty,
          action.payload.value,
        ),
      };
    }
    case 'UPDATE_MEDIA_FAVORITE': {
      return {
        ...state,
        popularMedias: updateMediaProperty(state.popularMedias, 'favorite', action.payload.media),
        latestMedias: updateMediaProperty(state.latestMedias, 'favorite', action.payload.media),
        theatresMedias: updateMediaProperty(state.onTheAirMedias, 'favorite', action.payload.media),
        trendingMedias: updateMediaProperty(state.trendingMedias, 'favorite', action.payload.media),
        mediaDetails: {
          ...state.mediaDetails,
          favorite: action.payload.media.favorite,
          recommendations: updateMediaProperty(state.mediaDetails.recommendations, 'favorite', action.payload.media),
        },
        mediasWatchlist: updateMediaProperty(state.mediasWatchlist, 'favorite', action.payload.media),
      };
    }
    case 'UPDATE_MEDIA_WATCHLIST': {
      const newArr = { ...state.mediasWatchlist };
      const mediaToDeleteIndex = (media: MovieInterface | TvShowInterface) => (el: any) => el.id === media.id;

      if (action.payload.media.watchlist) {
        newArr[mediaType].push(action.payload.media);
      } else {
        newArr[mediaType].splice(
          state.mediasWatchlist[mediaType].findIndex(mediaToDeleteIndex(action.payload.media)),
          1,
        );
      }

      return {
        ...state,
        popularMedias: updateMediaProperty(state.popularMedias, 'watchlist', action.payload.media),
        latestMedias: updateMediaProperty(state.latestMedias, 'watchlist', action.payload.media),
        onTheAirMedias: updateMediaProperty(state.onTheAirMedias, 'watchlist', action.payload.media),
        trendingMedias: updateMediaProperty(state.trendingMedias, 'watchlist', action.payload.media),
        mediaDetails: {
          ...state.mediaDetails,
          watchlist: action.payload.media.watchlist,
          recommendations: updateMediaProperty(state.mediaDetails.recommendations, 'watchlist', action.payload.media),
        },
        mediasWatchlist: newArr,
      };
    }
    case 'GET_ON_THE_AIR_MEDIAS': {
      const newArrOnTheAirMedias = { ...state.onTheAirMedias, loading: false };
      newArrOnTheAirMedias[mediaType] = action.payload.medias;
      return {
        ...state,
        onTheAirMedias: newArrOnTheAirMedias,
      };
    }
    case 'GET_TRENDING_MEDIAS': {
      const newArrTrendingMedias = { ...state.trendingMedias, loading: false };
      newArrTrendingMedias[mediaType] = action.payload.medias;

      return {
        ...state,
        trendingMedias: newArrTrendingMedias,
        loading: false,
      };
    }
    case 'GET_LATEST_MEDIAS': {
      const newArrLatestMedias = { ...state.latestMedias, loading: false };
      newArrLatestMedias[mediaType] = action.payload.medias;
      return {
        ...state,
        latestMedias: newArrLatestMedias,
        loading: false,
      };
    }
    case 'GET_MEDIAS_WATCHLIST': {
      const newArrWatchlist = { ...state.mediasWatchlist, loading: false };
      newArrWatchlist[mediaType] = action.payload.medias;
      return {
        ...state,
        mediasWatchlist: newArrWatchlist,
        loading: false,
      };
    }
  }

  return state;
}

const updateMediaProperty: any = (medias: any, property: string, mediaUpdated: any) => {
  const mediaById = (media: MovieInterface | TvShowInterface) => media.id === mediaUpdated.id;
  let res;

  // for media details (which are TvShowInterface | MovieInterface type
  if (Array.isArray(medias)) {
    const mediaIndexToChange = medias.findIndex(mediaById);
    res = [...medias];

    if (mediaIndexToChange !== -1 && mediaIndexToChange !== undefined) {
      res[mediaIndexToChange][property] = mediaUpdated[property];
    }
    //For MediaInterface types
  } else {
    Object.keys(medias).map((mediaType: any) => {
      if (mediaType !== 'loading' && Object.values(MediaEnum).includes(mediaType)) {
        res = { ...medias };
        const mediaIndexToChange = medias[mediaType].findIndex(mediaById);
        if (mediaIndexToChange !== -1 && mediaIndexToChange !== undefined) {
          res[mediaType][mediaIndexToChange][property] = mediaUpdated[property];
        }
      }
    });
  }

  return res;
};

const updateMediaDetailsProperty: any = (mediaDetails: any, propertyPath: string, value: any) => {
  console.info('mediadetials', mediaDetails);
  console.info('propertyPath', propertyPath);

  setToValue(mediaDetails, value, propertyPath);
  console.info('new mediadetials', mediaDetails);

  return mediaDetails;
};

function setToValue(obj: any, value: any, path: any) {
  let i;
  path = path.split('.');
  for (i = 0; i < path.length - 1; i++) obj = obj[path[i]];

  obj[path[i]] = value;
}

export default MediasReducer;
