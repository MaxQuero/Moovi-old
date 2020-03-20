import {Injectable } from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {UserInterface} from "./interfaces/user.interface";

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private s: Model<UserInterface>,
    ) {}
}
