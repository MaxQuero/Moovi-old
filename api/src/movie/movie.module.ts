import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import {MongooseModule} from "@nestjs/mongoose";
import {MovieSchema} from "./schemas/movie.schema";
import { MovieModelService } from '../helpers/movie.model.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
  ],
  providers: [MovieService, MovieModelService],
})
export class MovieModule {}

