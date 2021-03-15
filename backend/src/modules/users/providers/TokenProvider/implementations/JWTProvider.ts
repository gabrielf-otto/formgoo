import { sign, verify } from 'jsonwebtoken';
import ITokenSignDTO from '../dtos/ITokenSignDTO';
import ITokenProvider from '../models/ITokenProvider';


class JWTProvider implements ITokenProvider {
   async sign({ payload, user_id, secret, expiresIn }: ITokenSignDTO): Promise<string> 
   {
      return await sign(payload, secret, { 
         subject: user_id,
         expiresIn 
      });
   } 

   async verify(token: string, secret: string): Promise<string | object> {
      return await verify(token, secret);
   }
}


export default JWTProvider;
