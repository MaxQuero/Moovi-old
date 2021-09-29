import {HttpModule, Module} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {MovieSchema} from "./schemas/movie.schema";
import { HelpersService } from '../helpers/helpers.service';
import { MovieModelService } from '../helpers/movie.model.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }])
  ],
  providers: [MovieService, HelpersService, MovieModelService],
  controllers: [MovieController]
})
export class MovieModule {}

