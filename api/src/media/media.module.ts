import { HttpModule } from '@nestjs/axios'
import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { HelpersService } from '../helpers/helpers.service';
import { TvShowModelService } from '../helpers/tvShow.model.service';
import { MediaService } from './media.service';
import { TvShowSchema } from '../tvShow/schemas/tvShow.schema';
import { MovieSchema } from '../movie/schemas/movie.schema';
import { MovieModelService } from '../helpers/movie.model.service';
import { MovieService } from '../movie/movie.service';
import { TvShowService } from '../tvShow/tvShow.service';
import { EpisodeModelService } from '../helpers/episode.model.service';
import { EpisodeSchema } from '../episode/schemas/episode.schema';
import { EpisodeService } from 'src/episode/episode.service';
import { DateScalar, MediaResolvers } from './media.resolvers';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'TvShow', schema: TvShowSchema }]),
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
    MongooseModule.forFeature([{ name: 'Episode', schema: EpisodeSchema }])
  ],
  providers: [MediaService, HelpersService, TvShowModelService, MovieModelService, MovieService, TvShowService, EpisodeService, EpisodeModelService, MediaResolvers, DateScalar]
})
export class MediaModule {}

