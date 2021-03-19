import Resolution from '../infra/typeorm/entities/Resolution';
import IStoreResolutionDTO from '../dtos/IStoreResolutionDTO';


export default interface IResolutionRepository {
   store: (data: IStoreResolutionDTO) => Promise<Resolution>;
   save: (resolution: Resolution) => Promise<Resolution>;
   findById: (id: string) => Promise<Resolution | undefined>;
   findFormResolutions: (form_id: string) => Promise<Resolution[]>;
   deleteById: (id: string) => Promise<void>;
}
