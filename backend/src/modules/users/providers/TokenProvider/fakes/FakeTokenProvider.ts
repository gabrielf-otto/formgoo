import ITokenSignDTO from '../dtos/ITokenSignDTO';
import ITokenProvider from '../models/ITokenProvider';


class FakeTokenProvider implements ITokenProvider {
   async sign({ payload, user_id, secret, expiresIn }: ITokenSignDTO): Promise<string> {
      return secret;
   }

   async verify(token: string, secret: string): Promise<string | object> {
      return token;
   }
}


export default FakeTokenProvider;
