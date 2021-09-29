import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../user/dto/user.dto';
import { UserInterface } from '../user/interfaces/user.interface';


@Injectable()
export class UserModelService {
  constructor( @InjectModel('User') private readonly userModel: Model<UserInterface>) {
  }
  /**
   * Save new user in database
   */
  async addUser(user: UserDto) {
    const newUser = await new this.userModel(user);
    const userExists = this.userModel.findById(user.id);

    if (!userExists) {
      return newUser.save();
    } else {
      //TODO: handle already exists
    }
  }

}
