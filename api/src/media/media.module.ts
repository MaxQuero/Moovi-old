import {HttpModule, Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { HelpersService } from '../helpers/helpers.service';
import { TvShowModelService } from '../helpers/tvShow.model.service';
import { MediaService } from './media.service';
import { TvShowSchema } from '../tvShow/schemas/tvShow.schema';
import { MovieSchema } from '../movie/schemas/movie.schema';
import { MediaController } from './media.controller';
import { MovieModelService } from '../helpers/movie.model.service';
import { MovieService } from '../movie/movie.service';
import { TvShowService } from '../tvShow/tvShow.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'TvShow', schema: TvShowSchema }]),
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }])

  ],
  providers: [MediaService, HelpersService, TvShowModelService, MovieModelService, MovieService, TvShowService],
  controllers: [MediaController]
})
export class MediaModule {}
