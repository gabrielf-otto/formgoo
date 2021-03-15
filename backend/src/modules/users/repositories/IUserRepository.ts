import IStoreUserDTO from '@modules/users/dtos/IStoreUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';


export default interface IUserRepository {
   store(data: IStoreUserDTO): Promise<User>;
   save(user: User): Promise<User>;
   findById(id: string): Promise<User | undefined>;
   findByEmail(email: string): Promise<User | undefined>;
}
