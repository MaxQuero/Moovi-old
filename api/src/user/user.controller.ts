import {Controller, Get, HttpService, HttpStatus, Res} from '@nestjs/common';
import {AppConstants} from "../app.constants";
import {UserService} from "./user.service";

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private httpService: HttpService,
    ){}

    @Get('token')
    async getToken(@Res() response) {
         this.userService.getToken().then(
             (res) => {
                 return response.status(HttpStatus.OK).send(res);
             }
         )
    }

}
