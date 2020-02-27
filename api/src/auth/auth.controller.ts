import {Controller, Get, HttpService, HttpStatus, Res} from '@nestjs/common';
import {AppConstants} from "../app.constants";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private httpService: HttpService,
    ){}

    @Get('token')
    async getToken(@Res() response) {
         this.authService.getToken().then(
             (res) => {
                 return response.status(HttpStatus.OK).send(res);
             }
         )
    }

}
