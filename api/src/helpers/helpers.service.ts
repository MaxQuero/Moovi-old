import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { AppConstants } from '../app.constants';

@Injectable()
export class HelpersService {
  constructor(
    private httpService: HttpService
  ) {
  }

  /**
   * Add to watch list
   */
  async addToWatchlist(media, isWatchlisted: boolean, accountId: number, sessionId: string) {
    const addToWatchlistUrl = `${AppConstants.API_DEFAULT}/account/${accountId}/watchlist?api_key=${AppConstants.API_KEY}&session_id=${sessionId}`;
    const res = await this.makePostHttpRequest(addToWatchlistUrl,
      {
        'media_type': media.type,
        'media_id': media.id,
        'watchlist': isWatchlisted
      },
    );

    return res.data;
  }

  /**
   * Make get http request and handle error
   */
  async makeGetHttpRequest(url: string, data?: object) {
    try {
      return await this.httpService.get(url).toPromise();
    } catch (err) {
      throw new HttpException('It seems you have a problem with your internet connection', HttpStatus.BAD_REQUEST);
    }
  }
  z

  /**
   * Make post http request and handle error
   */
  async makePostHttpRequest(url: string, data?: any) {
    try {
      return await this.httpService.post(url,
        data,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
        }).toPromise();
    } catch (err) {
      throw new HttpException('It seems you have a problem with your internet connection', HttpStatus.BAD_REQUEST);
    }
  }

}
