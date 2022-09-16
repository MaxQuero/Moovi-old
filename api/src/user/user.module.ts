import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./schemas/user.schema";
import {UserController} from "./user.controller";
import { HelpersService } from '../helpers/helpers.service';
import { UserModelService } from '../helpers/user.model.service';
import { MovieSchema } from '../movie/schemas/movie.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema}, { name: 'Movie', schema: MovieSchema}]),
        HttpModule,
    ],
    providers: [UserService, HelpersService, UserModelService],
    controllers: [UserController]
})
export class UserModule {}