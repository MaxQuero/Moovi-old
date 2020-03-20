import {HttpModule, Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {FavoriteSchema} from "./schemas/favorite.schema";
import {FavoriteService} from "./favorite.service";
import {FavoriteController} from "./favorite.controller";

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'Favorite', schema: FavoriteSchema }])
],
  providers: [FavoriteService],
  controllers: [FavoriteController]
})
export class MovieModule {}

