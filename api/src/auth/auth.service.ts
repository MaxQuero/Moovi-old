import {HttpService, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {AuthInterface} from "./interfaces/auth.interface";
import {Model} from "mongoose";
import {AppConstants} from "../app.constants";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('Auth') private readonly authModel: Model<AuthInterface>,

        private httpService: HttpService
    ){}


    /*async saveUser(authDTO: AuthDTO){
        const auth = await new this.authModel(authDTO);
        return auth.save();
    }*/

    getToken() {
            return new Promise<any>(
                resolve => this.httpService.get(AppConstants.API_DEFAULT + '/authentication/guest_session/new?api_key=' + AppConstants.API_KEY).subscribe(
                    (response) => {
                        resolve(response.data);
                    }
                )
            );
    }

}

