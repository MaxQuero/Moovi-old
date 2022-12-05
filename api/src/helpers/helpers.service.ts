import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { _ } from 'lodash'

@Injectable()
export class HelpersService {
  constructor(
    private httpService: HttpService
  ) {
  }

  /**
   * Add to watch list
   */
  // TODO: refacti avec rating et watchlist (+ mutu avec moiovie/ tv show/ season et episode)
  async addToWatchlist(media, accountId: number, sessionId: string) {
    const addToWatchlistUrl = `${process.env.API_DEFAULT}/account/${accountId}/watchlist?api_key=${process.env.API_KEY}&session_id=${sessionId}`;
    const res = await this.makePostHttpRequest(addToWatchlistUrl,
      {
        'media_type': media.type,
        'media_id': media.id,
        'watchlist': media?.watchlist
      },
    );

    return res.data;
  }

  camelize(obj) {
    return _.transform(obj, (acc, value, key, target) => {
      const camelKey = _.isArray(target) ? key : _.camelCase(key);

      acc[camelKey] = _.isObject(value) ? this.camelize(value) : value;
    });
  }

  /**
   * Make get http request and handle error
   */
  async makeGetHttpRequest(url: string, data?: object) {
    try {
      return await this.httpService.get(url, {
        transformResponse: [(data, headers) => {
          const parsedData = JSON.parse(data)
          const formattedData = this.camelize(parsedData);
          return formattedData;
          }]
      }).toPromise();

    } catch (err) {
      throw new HttpException('It seems you have a problem with your internet connection', HttpStatus.BAD_REQUEST);
    }
  }

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
            transformResponse: [(data, headers) => {
              const parsedData = JSON.parse(data)
              const formattedData = this.camelize(parsedData);
              return formattedData;
            }]
        }).toPromise();
    } catch (err) {
      throw new HttpException('It seems you have a problem with your internet connection', HttpStatus.BAD_REQUEST);
    }
  }
}
