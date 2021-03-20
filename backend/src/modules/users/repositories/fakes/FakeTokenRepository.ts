import { uuid } from 'uuidv4';

import Token from '@modules/users/infra/typeorm/entities/Token';
import ITokenRepository from '../ITokenRepository';


class FakeTokenRepository implements ITokenRepository {
   private tokens: Token[] = [];

   async generateTo(user_id: string): Promise<Token> {
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

   async findByUserId(user_id: string): Promise<Token | undefined> {
      return this.tokens.find(token => token.user_id === user_id);
   }

   async deleteById(id: string): Promise<void> {
      const index = this.tokens.findIndex(token => token.id === id);
      this.tokens.splice(index, 1);
   }
}


export default FakeTokenRepository;
