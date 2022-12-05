import {Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';
import { TvShowModule } from './tvShow/tvShow.module';
import { MediaModule } from './media/media.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/moovi', { useNewUrlParser: true }),
    MovieModule,
    TvShowModule ,
    MediaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      subscriptions: {
        'graphql-ws': true
      },
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
