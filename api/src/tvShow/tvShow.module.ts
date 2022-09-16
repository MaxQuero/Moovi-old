import {Module} from '@nestjs/common';
import { TvShowService } from './tvShow.service';
import {MongooseModule} from "@nestjs/mongoose";
import {TvShowSchema} from "./schemas/tvShow.schema";
import { TvShowModelService } from '../helpers/tvShow.model.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'TvShow', schema: TvShowSchema }])
  ],
  providers: [TvShowService, TvShowModelService]
})
export class TvShowModule {}

