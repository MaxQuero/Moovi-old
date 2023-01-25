import {NotFoundException} from '@nestjs/common';
import {
  Args,
  createUnionType,
  CustomScalar,
  Int,
  Mutation,
  Query,
  Resolver,
  Scalar
} from '@nestjs/graphql';
import { Media } from './models/media.model';
import { MediaService } from './media.service';
import {MediaEnum, MediaInput} from './dto/media.dto';
import { Movie } from '../movie/models/movie.model';
import { TvShow } from '../tvShow/models/tvShow.model';
import { Season } from '../season/models/season.model';
import { Kind, ValueNode } from 'graphql/language';
import {HelpersService} from "../helpers/helpers.service";

@Scalar('Date', (type) => Date)
export class DateScalar implements CustomScalar<number, Date> {

  description = 'Date custom scalar type';

  parseValue(value: number): Date {
    return new Date(value); // value from the client
  }

  serialize(value: Date): number {
    if (typeof value === 'string') return new Date(value).getTime()
    else return value.getTime(); // value sent to the client
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}

export const MediaDetail = createUnionType({
  name: 'MediaDetails',
  types: () => [Movie, TvShow] as const,
  resolveType(media) {
    switch(media?.type) {
      case MediaEnum.Movie :
        return Movie
      case MediaEnum.Tv:
        return TvShow
      default:
        return Movie
    }
  }
})

@Resolver(of => Media)
export class MediaResolvers {
  constructor(
      private readonly mediaService: MediaService,
      private helpersService: HelpersService
  ) {}

  @Query(returns => [MediaDetail])
  async trendingMedias(@Args('mediaType') mediaType: MediaEnum) {
    const trendingMedias = await this.mediaService.getTrendingMedias(mediaType);

    return trendingMedias
  }

  @Query(returns => [MediaDetail])
  async popularMedias(@Args('mediaType') mediaType: MediaEnum) {
    const popularMedias = await this.mediaService.getPopularMedias(mediaType);

    return popularMedias
  }

  @Query(returns => [MediaDetail])
  async onTheAirMedias(@Args('mediaType') mediaType: MediaEnum) {
    const onTheAirMedias = await this.mediaService.getOnTheAirMedias(mediaType);

    return onTheAirMedias
  }

  @Query(returns => [MediaDetail])
  async latestMedias(@Args('mediaType') mediaType: MediaEnum) {
    const latestMedias = await this.mediaService.getLatestMedias(mediaType);

    return latestMedias
  }

  @Query(returns => MediaDetail)
  async mediaDetails(@Args({ name: 'mediaId' }) id: string,
                     @Args('mediaType') mediaType: MediaEnum,
                     @Args('sessionId') sessionId: string
  ): Promise<any> {
    const media = await this.mediaService.getMediaDetailsFromId(id, mediaType, sessionId);

    if (!media) {
      throw new NotFoundException(id);
    }

    return media
  }

  @Query(returns => Season)
  async seasonDetails(@Args({ name: 'mediaId' }) id: string,
                     @Args({ name: 'seasonNumber', type: () => Int }) seasonNumber: number,
                     @Args('sessionId') sessionId: string
  ): Promise<any> {
    const seasonDetails = await this.mediaService.getSeasonDetailsFromMediaId(id, seasonNumber, sessionId);

    if (!seasonDetails) {
      throw new NotFoundException(id);
    }

    return seasonDetails
  }

  @Query(returns => [MediaDetail])
  async searchResults(@Args({ name: 'mediaType' }) mediaType: MediaEnum,
                      @Args({ name: 'query' }) query: string,
                      @Args({ name: 'sessionId' }) sessionId: string,
                      @Args({ name: 'page', type: () => Int } ) page: number
  ): Promise<any> {
    const searchResults = await this.mediaService.searchMedias(mediaType, query, page);

    //TODO : mieux gérer les erreurs (concerne toutes les query / mutations)
    if (!searchResults) {
      throw new NotFoundException(searchResults);
    }

    return searchResults
  }

  @Query(returns => [MediaDetail])
  async watchlistMedias(@Args({ name: 'mediaType' }) mediaType: MediaEnum,
                      @Args({ name: 'accountId', type: () => Int  }) accountId: number,
                      @Args({ name: 'sessionId' }) sessionId: string,
                      @Args({ name: 'page', type: () => Int } ) page: number
  ): Promise<any> {
    const mediasWatchlist = this.mediaService.getMediaWatchlist(mediaType, accountId, sessionId, page);

    //TODO : mieux gérer les erreurs (concerne toutes les query / mutations)
    if (!mediasWatchlist) {
      throw new NotFoundException(mediasWatchlist);
    }

    return mediasWatchlist
  }

  @Mutation(returns => MediaDetail)
  async rateMedia(@Args({ name: 'media',  type: () => MediaInput }) media:  Movie | TvShow,
                  @Args('sessionId') sessionId: string): Promise<any> {
    const response = await this.mediaService.rateMedia(media, sessionId);
    await this.mediaService.patchRatings(media);
    await this.mediaService.refreshMedias(media, media.type);

    if (!response) {
      throw new NotFoundException(media.id);
    }
    return media
  }


  @Mutation(returns => MediaDetail)
  async watchlistMedia(@Args({ name: 'media',  type: () => MediaInput }) media: Movie | TvShow,
                  @Args({ name: 'accountId', type: () => Int }) accountId: number,
                  @Args({ name: 'sessionId' }) sessionId: string): Promise<any> {
    const response = await this.helpersService.addToWatchlist(media, accountId, sessionId)
    await this.mediaService.patchWatchlist(media)
    await this.mediaService.refreshMedias(media, media.type);

    if (!response) {
      throw new NotFoundException(media.id);
    }
    return media
  }


  @Mutation(returns => MediaDetail)
  async favoriteMedia(@Args({ name: 'media',  type: () => MediaInput }) media: Movie | TvShow,
                      @Args({ name: 'accountId', type: () => Int }) accountId: number,
                  @Args('sessionId') sessionId: string): Promise<any> {

    const response = await this.mediaService.setToFavoriteMedia(media, accountId, sessionId);
    await this.mediaService.patchFavorites(media);
    await this.mediaService.refreshMedias(media, media.type);

    if (!response) {
      throw new NotFoundException(media.id);
    }
    return media
  }
}