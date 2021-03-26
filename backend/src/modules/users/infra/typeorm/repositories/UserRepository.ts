import { getRepository, Repository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User'; 
import IUserRepository from '@modules/users/repositories/IUserRepository';


interface IRequest {
   name: string;
   email: string;
   password: string;
}

class UserRepository implements IUserRepository {
   private repository: Repository<User>

   constructor() {
      this.repository = getRepository(User);
   }

   async store({ name, email, password }: IRequest): Promise<User> {
      const user = await this.repository.create({ 
         name, 
         email, 
         password 
      });

      await this.repository.save(user);
      return user;
   }

   async save(user: User): Promise<User> {
      return await this.repository.save(user);
   }
   
   async findById(id: string): Promise<User | undefined> {
      return await this.repository.findOne(id);  
   }

   async findByEmail(email: string): Promise<User | undefined> {
      return await this.repository.findOne({ where: { email } });  
   }
}


export default UserRepository;
