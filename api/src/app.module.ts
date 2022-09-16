import {Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';
import {AppConstants} from "./app.constants";
import { TvShowModule } from './tvShow/tvShow.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    AppConstants,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/moovi', { useNewUrlParser: true }),
    MovieModule,
    TvShowModule ,
    MediaModule
  ],
  exports: [
    AppConstants
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
