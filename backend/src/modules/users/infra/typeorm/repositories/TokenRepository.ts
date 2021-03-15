import { Repository, getRepository } from 'typeorm';

import Token from '../entities/Token';
import ITokenRepository from '@modules/users/repositories/ITokenRepository';


class TokenRepository implements ITokenRepository {
   private repository: Repository<Token>;

   constructor() {
      this.repository = getRepository(Token);
   }

   async generate(user_id: string): Promise<Token> {
      const token = await this.repository.create({ 
         user_id 
      });
      
      await this.repository.save(token);
      return token;
   }

   async findByValue(value: string): Promise<Token | undefined> {
      return await this.repository.findOne({ 
         where: { value } 
      });
   }
}


export default TokenRepository;
