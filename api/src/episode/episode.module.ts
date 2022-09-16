import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {EpisodeSchema} from "./schemas/episode.schema";
import { MovieModelService } from '../helpers/movie.model.service';
import { EpisodeService } from './episode.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Episode', schema: EpisodeSchema }])
  ],
  providers: [EpisodeService, MovieModelService],
})
export class EpisodeModule {}

