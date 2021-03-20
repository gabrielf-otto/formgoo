import Token from '@modules/users/infra/typeorm/entities/Token';


export default interface ITokenRepository {
   generateTo: (user_id: string) => Promise<Token>;
   findByValue: (value: string) => Promise<Token | undefined>;
   findByUserId: (user_id: string) => Promise<Token | undefined>;
   deleteById: (id: string) => Promise<void>;
}
