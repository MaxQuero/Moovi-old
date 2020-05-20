import {Body, Controller, Get, HttpService, Post, Res} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserDto} from "./dto/user.dto";

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private httpService: HttpService,
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
                this.userService.saveUser(user);
               return JSON.stringify(
                   {
                       username: user.username,
                       sessionId : sessionId
                   });
           },
           (err) => {
               return err;
           }
       );

    }
}
