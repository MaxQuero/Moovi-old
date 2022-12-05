import { HttpService } from '@nestjs/axios'
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserInterface } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { HelpersService } from '../helpers/helpers.service';


@Injectable()
export class UserService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
    private httpService: HttpService,
    private helpersService: HelpersService
  ) {
  }

  /**
   * Get session for user
   */
  async getSession(requestToken: string): Promise<any> {
    const urlSession = `${process.env.API_DEFAULT}/authentication/session/new?api_key=${process.env.API_KEY}`;

    try {
      const res: any = await this.helpersService.makePostHttpRequest(urlSession, requestToken);

      return res.data;
    } catch(err) {
      throw new HttpException(err.response.data, err.response.status);
    }
  }


  /**
   * Get user from his session id
   */
  async getUserFromSessionId(sessionId: string): Promise<any> {
    const urlUser = `${process.env.API_DEFAULT}/account?api_key=${process.env.API_KEY}&session_id=${sessionId}`;

    try {
      const res: any = await this.helpersService.makeGetHttpRequest(urlUser);
      if (res.status !== 200) {
        throw new Error('user does not exist for this sessionId');
      } else {
        return this.processData(res.data, sessionId);
      }
    }
    catch (err) {
      throw new HttpException(err.response.data, err.response.status);
    }

  }

  /**
   * Process data
   */
  processData(user: any, sessionId: string): UserDto {
    return {
      id: user.id,
      sessionId: sessionId,
      username: user.username,
    };
  }
}

