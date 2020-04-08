import {HttpModule, Module} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {MovieSchema} from "./schemas/movie.schema";

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }])
  ],
  providers: [MovieService],
  controllers: [MovieController]
})
export class MovieModule {}

