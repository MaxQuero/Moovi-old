import { AppConstants } from '../app.constants';
import { TvShowInterface } from '../interfaces/TvShow.interface';
import { MovieInterface } from '../interfaces/Movie.interface';
import { MediaEnum } from '../interfaces/Media.interface';
import EpisodeDetails from '../views/Seasons/EpisodeDetails/EpisodeDetails';
export async function getRequestToken(): Promise<any> {
  const urlToken = AppConstants.API_DEFAULT + '/authentication/token/new?api_key=' + AppConstants.API_KEY;

  return callUrl(urlToken).then((res) => {
    return res.request_token;
  });
}

export async function getUser(params: any): Promise<any> {
  const requestToken = params.get('request_token');
  const urlSession = AppConstants.BACK_URL + '/user/create';

  const res = await callUrl(urlSession, {
    method: 'POST',
    body: JSON.stringify({ request_token: requestToken }),
    headers: { 'Content-type': 'application/json' },
  });
  console.log('get user then', res);
  return res;
}

export async function getPopularMedias(mediaType: string): Promise<any> {
  const popularMediasUrl = AppConstants.BACK_URL + '/media/popular';
  console.info(
    'pop',
    await callUrl(popularMediasUrl, {
      method: 'POST',
      body: JSON.stringify({
        mediaType: mediaType,
      }),
      headers: { 'Content-type': 'application/json' },
    }),
  );
  return await callUrl(popularMediasUrl, {
    method: 'POST',
    body: JSON.stringify({
      mediaType: mediaType,
    }),
    headers: { 'Content-type': 'application/json' },
  });
}

export async function getOnTheAirMedias(mediaType: string): Promise<any> {
  const onTheAirMediasUrl = AppConstants.BACK_URL + '/media/on-the-air';
  return callUrl(onTheAirMediasUrl, {
    method: 'POST',
    body: JSON.stringify({
      mediaType: mediaType,
    }),
    headers: { 'Content-type': 'application/json' },
  });
}

export async function getTrendingMedias(mediaType: MediaEnum): Promise<any> {
  const trendingMediasUrl = AppConstants.BACK_URL + '/media/trending';
  return callUrl(trendingMediasUrl, {
    method: 'POST',
    body: JSON.stringify({
      mediaType: mediaType,
    }),
    headers: { 'Content-type': 'application/json' },
  });
}

export async function getUpcomingMedias(mediaType: string): Promise<any> {
  const upcomingMediasUrl = AppConstants.BACK_URL + '/media/latest';
  return callUrl(upcomingMediasUrl, {
    method: 'POST',
    body: JSON.stringify({
      mediaType: mediaType,
    }),
    headers: { 'Content-type': 'application/json' },
  });
}

export async function getMediaDetailsFromId(mediaId: string, mediaType: MediaEnum, sessionId?: string): Promise<any> {
  const mediaDetailsUrl = `${AppConstants.BACK_URL}/media/${mediaId}`;
  return callUrl(mediaDetailsUrl, {
    method: 'POST',
    body: JSON.stringify({
      sessionId: sessionId,
      mediaType: mediaType,
    }),
    headers: { 'Content-type': 'application/json' },
  });
}

export async function getMediaSeasonDetailsFromMediaId(
  mediaId: number,
  seasonNumber: number,
  sessionId?: string,
): Promise<any> {
  const mediaSeasonDetailsUrl = `${AppConstants.BACK_URL}/media/${mediaId}/season`;
  return callUrl(mediaSeasonDetailsUrl, {
    method: 'POST',
    body: JSON.stringify({
      sessionId: sessionId,
      seasonNumber: seasonNumber,
    }),
    headers: { 'Content-type': 'application/json' },
  });
}

export async function rateMedia(
  rating: number,
  media: MovieInterface | TvShowInterface,
  sessionId: string,
): Promise<any> {
  const rateMediaUrl = `${AppConstants.BACK_URL}/media/${media.id}/rate`;
  try {
    return callUrl(rateMediaUrl, {
      method: 'POST',
      body: JSON.stringify({
        rating: rating,
        sessionId: sessionId,
        media: media,
      }),
      headers: { 'Content-type': 'application/json' },
    });
  } catch (err) {
    throw new Error('Error when trying to rate media');
  }
}

export async function rateEpisode(
  mediaId: number,
  episodeId: number,
  seasonNumber: number,
  episodeNumber: number,
  rating: number,
  sessionId: string,
): Promise<any> {
  const rateMediaUrl = `${AppConstants.BACK_URL}/media/${mediaId}/season/${seasonNumber}/episode/${episodeNumber}/rate`;
  try {
    return callUrl(rateMediaUrl, {
      method: 'POST',
      body: JSON.stringify({
        episodeId: episodeId,
        rating: rating,
        sessionId: sessionId,
      }),
      headers: { 'Content-type': 'application/json' },
    });
  } catch (err) {
    throw new Error('Error when trying to rate episode');
  }
}

export async function favMedia(
  media: MovieInterface | TvShowInterface,
  isFavorite: boolean,
  accountId: number,
  sessionId: string,
): Promise<any> {
  const favMediaUrl = `${AppConstants.BACK_URL}/media/${media.id}/favorite`;
  try {
    return callUrl(favMediaUrl, {
      method: 'POST',
      body: JSON.stringify({
        accountId: accountId,
        sessionId: sessionId,
        media: media,
        isFavorite: isFavorite,
      }),
      headers: { 'Content-type': 'application/json' },
    });
  } catch (err) {
    throw new Error('Error when trying to fav the media');
  }
}

export async function setMediaToWatchlist(
  media: MovieInterface | TvShowInterface,
  isWatchlisted: boolean,
  accountId: number,
  sessionId: string,
): Promise<any> {
  const setToWatchlistUrl = `${AppConstants.BACK_URL}/media/${media.id}/watchlist`;

  try {
    return callUrl(setToWatchlistUrl, {
      method: 'POST',
      body: JSON.stringify({
        accountId: accountId,
        sessionId: sessionId,
        media: media,
        isWatchlisted: isWatchlisted,
      }),
      headers: { 'Content-type': 'application/json' },
    });
  } catch (err) {
    throw new Error('Error when adding media to watchlist');
  }
}

export async function searchMedias(mediaType: string, query: string, page = 1): Promise<any> {
  const searchMediasUrl = `${AppConstants.BACK_URL}/media/search`;
  return callUrl(searchMediasUrl, {
    method: 'POST',
    body: JSON.stringify({
      query: query,
      page: page,
      mediaType: mediaType,
    }),
    headers: { 'Content-type': 'application/json' },
  });
}

export async function getMediaWatchlist(mediaType: MediaEnum, accountId: number, sessionId: string, page = 1) {
  const mediaWatchlistUrl = `${AppConstants.BACK_URL}/media/watchlist`;
  return callUrl(mediaWatchlistUrl, {
    method: 'POST',
    body: JSON.stringify({
      accountId: accountId,
      sessionId: sessionId,
      mediaType: mediaType,
      page: page,
    }),
    headers: { 'Content-type': 'application/json' },
  });
}

export async function callUrl(url: string, options?: any): Promise<any> {
  try {
    const res: any = await fetch(url, options);
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  } catch (err) {
    throw new Error(err.message);
  }
}
