import { Body, Controller, Get, HttpService, Param, Post, Res } from '@nestjs/common';
import {UserService} from "./user.service";
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private httpService: HttpService
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
      console.log('sessionId', sessionId);

       return this.userService.getUserFromSessionId(sessionId).then(
           (user) => {
             console.log('userrr', user);
             this.userService.addUser(user);
             return JSON.stringify(
                 {
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
  async getUserRatings(@Body() body, @Param() params): Promise<any> {
    const { sessionId } = body;
    const accountId = params.id;
    return this.userService.getUserRatings(accountId, sessionId);
  }
}
