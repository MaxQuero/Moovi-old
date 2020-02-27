import {HttpModule, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import {MongooseModule} from "@nestjs/mongoose";
import {AuthSchema} from "./schemas/auth.schema";
import {AuthController} from "./auth.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema}]),
        HttpModule,
    ],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
