import { Inject, Service } from 'typedi';

import { UserModel } from '../models/user.model';
import { formatUser } from '../utils/format.util';
import { isEmpty } from './../utils/format.util';

@Service()
export default class UserService {
  constructor(@Inject('userModel') private userModel: Models.UserModel) {
    this.userModel = UserModel;
  }

  async getUserStatus() {
    try {
      const user = await this.userModel.find();

      if (isEmpty(user)) {
        throw new Error('No User Found!!');
      }

      return {
        Registered: user.length,
        Emails: [...user.map((u) => u.email)],
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const user = await this.userModel.find();

      if (isEmpty(user)) {
        throw new Error('No User Found!!');
      }

      return formatUser(user);
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.userModel.findById(id);

      if (isEmpty(user)) {
        throw new Error('No User Found!!');
      }

      return formatUser(user);
    } catch (error) {
      throw error;
    }
  }

  async getRoleUser(id: string) {
    try {
      const user = await this.userModel.findById(id);

      if (isEmpty(user)) {
        throw new Error('No User Found!!');
      }

      return {
        Result: `Username: ${user.username} | role: ${user.role}`,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await this.userModel.findByIdAndDelete(id);

      if (isEmpty(user)) {
        throw new Error('No User Found!!');
      }

      return { Result: `Successfully delete ${id} user` };
    } catch (error) {
      throw error;
    }
  }
}
