import { hash, compare } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';


class BCryptProvider implements IHashProvider {
   async generate(payload: string): Promise<string> {
      return hash(payload, 8);
   }

   async compare(payload: string, hash: string): Promise<boolean> {
      return compare(payload, hash);
   }
}


export default BCryptProvider;
