import Resolution from '../infra/typeorm/entities/Resolution';
import IMergeResolutionDTO from '../dtos/IMergeResolutionDTO';
import IStoreResolutionDTO from '../dtos/IStoreResolutionDTO';
import IFindMyResolutionDTO from '../dtos/IFindMyResolutionDTO';


export default interface IResolutionRepository {
   store: (data: IStoreResolutionDTO) => Promise<Resolution>;
   merge: (resolution: Resolution, data: IMergeResolutionDTO) => Promise<Resolution>;
   save: (resolution: Resolution) => Promise<Resolution>;
   findById: (id: string) => Promise<Resolution | undefined>;
   findMyResolution: (data: IFindMyResolutionDTO) => Promise<Resolution | undefined>;
   findDeliveredFrom: (id: string) => Promise<Resolution | undefined>;
   delete: (resolution_id: string) => Promise<void>;
}
