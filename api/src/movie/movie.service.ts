import {HttpService, Injectable, NotFoundException} from '@nestjs/common';
import {AppConstants} from "../app.constants";

@Injectable()
export class MovieService {
    constructor(
        private httpService: HttpService
    ) {
    }

     getMovies() {
         return new Promise<any>(
             resolve => this.httpService.get(AppConstants.API_DEFAULT + '/movie/popular?api_key=' + AppConstants.API_KEY).subscribe(
            (response) => {
                resolve(response.data);

            },
            (err) => {
                throw new NotFoundException('Movie does not exist!' + err);
            }));
    }

    getMoviesOservable
}
