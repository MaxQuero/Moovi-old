import {HttpModule, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/auth.module';
import {AppConstants} from "./app.constants";

@Module({
  imports: [
    AppConstants,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/moovi', { useNewUrlParser: true }),
    MovieModule
  ],
  exports: [
    AppConstants
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
