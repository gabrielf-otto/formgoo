import { uuid } from 'uuidv4';

import Token from '@modules/users/infra/typeorm/entities/Token';
import ITokenRepository from '../ITokenRepository';


class FakeTokenRepository implements ITokenRepository {
   private tokens: Token[] = [];

   async generate(user_id: string): Promise<Token> {
      const token = new Token();

      Object.assign(token, {
         id: uuid(),
         value: uuid(),
         user_id,
         created_at: new Date,
         updated_at: new Date
      });

      this.tokens.push(token);
      return token;
   }

   async findByValue(value: string): Promise<Token | undefined> {
      return await this.tokens.find(token => token.value === value);
   }
}


export default FakeTokenRepository;
