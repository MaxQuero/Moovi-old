import {HttpModule, Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./schemas/user.schema";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
],
  providers: [UserService],
  controllers: [UserController]
})
export class MovieModule {}

