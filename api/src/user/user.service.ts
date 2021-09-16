import {HttpException, HttpService, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {UserInterface} from "./interfaces/user.interface";
import {Model} from "mongoose";
import {AppConstants} from "../app.constants";
import {UserDto} from "./dto/user.dto";
import {catchError, map} from "rxjs/operators";


@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserInterface>,
        private httpService: HttpService
    ){}

     getSession(requestToken: string): Promise<any> {
        const urlSession = `${AppConstants.API_DEFAULT}/authentication/session/new?api_key=${AppConstants.API_KEY}`;
        return this.httpService.post(urlSession,
            requestToken,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).pipe(
                map(
                    response => {
                        return response.data;
                    }
                ),
                catchError(e => {
                    throw new HttpException(e.response.data, e.response.status);
                }),
        ).toPromise();
    }


  getUserRatings(accountId: string, sessionId: string) {
    const userRatingsUrl = `${AppConstants.API_DEFAULT}/account/${accountId}/rated/movies?api_key=${AppConstants.API_KEY}&session_id=${sessionId}`;
    return this.httpService.get(userRatingsUrl)
      .pipe(
        map(response => {
          console.log('user ratings', response.data);

          return response.data;
        })
      )
  }



  getUserFromSessionId(sessionId: string) : Promise<any> {
      const urlUser = `${AppConstants.API_DEFAULT}/account?api_key=${AppConstants.API_KEY}&session_id=${sessionId}`;
      return this.httpService.get(urlUser).pipe(
          map(
              response => {
                  if (response.status !== 200) {
                      throw new Error('user does not exist for this sessionId');
                  } else {
                      return this.processData(response.data, sessionId);
                  }
              }
          ),
          catchError(e => {
              throw new HttpException(e.response.data, e.response.status);
          }),
      ).toPromise();

    }

    processData(user: any, sessionId: string): UserDto{
        return {
            id: user.id,
            sessionId: sessionId,
            username: user.username,
        };
    }


    async addUser(user: UserDto) {
        const newUser = await new this.userModel(user);
        const userExists = this.userModel.findById(user.id);

        if (!userExists) {
            return newUser.save();
        } else {
            //TODO: handle already exists
        }
    }
}

