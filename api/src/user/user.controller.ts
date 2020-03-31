import {Body, Controller, Get, HttpService, HttpStatus, Post, Redirect, Res} from '@nestjs/common';
import {AppConstants} from "../app.constants";
import {UserService} from "./user.service";

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private httpService: HttpService,
    ){}

    @Post('login')
    async getRequestToken(@Body() body, @Res() response) {
        console.log(body.token);
         return this.userService.redirectUser(body).then(
             (res) => {
                this.userService.saveUser(res);
                 return response.json(res.request_token);
             }
         )
    }

}
