import { Body, Controller, Get, HttpService, Param, Post, Res } from '@nestjs/common';
import {UserService} from "./user.service";
import { MovieService } from '../movie/movie.service';
import { UserModelService } from '../helpers/user.model.service';
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private userModelService: UserModelService
    ){
    }

    @Post('create')
    async createUser(@Body() body): Promise<any> {
        const sessionId = await this.userService.getSession(body).then(
            (session) => {
                if(session.success) {
                  return session.session_id;
                } else {
                    //TODO: error
                }
            }
        );

       return this.userService.getUserFromSessionId(sessionId).then(
           (user) => {
             this.userModelService.addUser(user);
             return JSON.stringify(
                 {
                      id: user.id,
                     username: user.username,
                     sessionId : sessionId
                 });
           },
           (err) => {
               return err;
           }
       )
    }

  @Post(':id/ratings')
  async getUserMoviesRatings(@Body() body, @Param() params): Promise<any> {
    const { sessionId } = body;
    const accountId = params.id;
    return this.userService.getUserMoviesRatings(accountId, sessionId);
  }

}
