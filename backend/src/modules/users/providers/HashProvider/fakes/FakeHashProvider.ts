import IHashProvider from '../models/IHashProvider';


class FakeHashProvider implements IHashProvider {
   async generate(payload: string): Promise<string> {
      return payload;
   }

   async compare(payload: string, hash: string): Promise<boolean> {
      return payload === hash;
   }
}


export default FakeHashProvider;
