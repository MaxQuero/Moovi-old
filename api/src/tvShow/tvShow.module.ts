import {HttpModule, Module} from '@nestjs/common';
import { TvShowService } from './tvShow.service';
import {MongooseModule} from "@nestjs/mongoose";
import {TvShowSchema} from "./schemas/tvShow.schema";
import { HelpersService } from '../helpers/helpers.service';
import { TvShowModelService } from '../helpers/tvShow.model.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'TvShow', schema: TvShowSchema }])
  ],
  providers: [TvShowService, HelpersService, TvShowModelService]
})
export class TvShowModule {}

