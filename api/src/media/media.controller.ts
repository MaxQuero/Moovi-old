import { Body, Controller, Param, Post } from '@nestjs/common';
import { MediaService } from './media.service';
import { HelpersService } from '../helpers/helpers.service';
import { TvShowModelService } from '../helpers/tvShow.model.service';
import { MovieModelService } from '../helpers/movie.model.service';

@Controller('media')
export class MediaController {
  constructor(
    private mediaService: MediaService,
    private tvShowModelService:TvShowModelService,
    private movieModelService: MovieModelService,
    private helpersService: HelpersService
  ) {
  }

  // Get popular Medias
  @Post('popular')
  async getPopularMediasAction(@Body() body) {
    const { mediaType } = body;

    return this.mediaService.getPopularMedias(mediaType);
  }

  // Get trendings medias
  @Post('trending')
  async getTrendingsMedias(@Body() body) {
    const { mediaType } = body;
    return this.mediaService.getTrendingMedias(mediaType);
  }


  // get Medias on the air
  @Post('on-the-air')
  async getOnTheAirMedias(@Body() body) {
    const { mediaType } = body;
    return this.mediaService.getOnTheAirMedias(mediaType);
  }


  // Get latest Medias
  @Post('latest')
  async getLatestMedias(@Body() body) {
    const { mediaType } = body;
    return this.mediaService.getLatestMedias(mediaType);
  }

  @Post('search')
  getMediaResults(@Body() body) {
    const { query, page, mediaType } = body;
    return this.mediaService.searchMedias(mediaType, query, page);
  }


  @Post('watchlist')
  getMediaWatchlist(@Body() body) {
    const { accountId, sessionId, page, mediaType} = body;
    return this.mediaService.getMediaWatchlist(mediaType, accountId, sessionId, page);
  }

  // Fetch a particular post using ID
  @Post(':id')
  getMediaDetails(@Body() body, @Param() params) {
    const { sessionId, mediaType } = body;
    return this.mediaService.getMediaDetailsFromId(params.id, mediaType, sessionId);
  }


  @Post(':id/rate')
  async rateMediaAction(@Body() body, @Param() params) {
    const { rating, sessionId, media } = body;
    const res = await this.mediaService.rateMedia(media, rating, sessionId);
    await this.mediaService.patchRatings(media, rating);
    await this.mediaService.refreshMedias();
    return JSON.stringify(res);
  }

  @Post(':id/favorite')
  async setToFavoritesMediaAction(@Body() body, @Param() params) {
    const { accountId, sessionId, media, isFavorite } = body;

    const res = await this.mediaService.setToFavoriteMedia(media, isFavorite, accountId, sessionId);
    console.log('res', res);

      await this.mediaService.patchFavorites(media, isFavorite);
      await this.mediaService.refreshMedias();
      return JSON.stringify(res);
  }

  @Post(':id/watchlist')
  async setToWatchlist(@Body() body, @Param() params): Promise<any> {
    const { sessionId, media, isWatchlisted } = body;
    const accountId = params.id;
    const res = await this.helpersService.addToWatchlist(media, isWatchlisted, accountId, sessionId);
    await this.mediaService.patchWatchlist(media, isWatchlisted);
    await this.mediaService.refreshMedias();

    return JSON.stringify(res);
  }
}
