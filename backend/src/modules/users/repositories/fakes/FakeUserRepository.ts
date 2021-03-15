import { uuid } from 'uuidv4';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';


interface IRequest {
   email: string;
   password: string;
}

class FakeUserRepository implements IUserRepository {
   private users: User[] = [];

   public async store({ email, password }: IRequest): Promise<User> {
      const user = new User();

      Object.assign(user, {
         id: uuid(),
         email,
         password
      });

      this.users.push(user);
      return user;
   }

   async save(user: User): Promise<User> 
   {
      const index = this.users.findIndex(obj => obj.id === user.id);
      this.users[index] = user;
      return user;
   }

   async findById(id: string): Promise<User | undefined> {
      return this.users.find(user => user.id === id);
   }

   async findByEmail(email: string): Promise<User | undefined> {
      return this.users.find(user => user.email === email);
   }
}


export default FakeUserRepository;
