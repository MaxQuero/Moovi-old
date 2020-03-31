import {HttpService, Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {UserInterface} from "./interfaces/user.interface";
import {Model} from "mongoose";
import {AppConstants} from "../app.constants";
import {UserDto} from "./dto/user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserInterface>,
        private httpService: HttpService
    ){}

    redirectUser(requestToken : string) {
        const urlLogin = AppConstants.LOGIN_REDIRECT_URL + requestToken + "?redirect_to=" + AppConstants.FRONT_URL;
        return new Promise<any>(
            resolve => fetch(urlLogin).then(
                (response) => {
                    response.json().then(
                        (data) => {
                            resolve(data);
                        }
                    )
                })
        )

    }

    saveUser(user: UserDto) {
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }

}

