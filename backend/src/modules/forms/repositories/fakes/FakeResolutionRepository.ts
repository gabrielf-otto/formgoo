import Resolution from '@modules/forms/infra/typeorm/entities/Resolution';
import IMergeResolutionDTO from '@modules/forms/dtos/IMergeResolutionDTO';
import IStoreResolutionDTO from '@modules/forms/dtos/IStoreResolutionDTO';
import IResolutionRepository from '../IResolutionRepository';
import IFindMyResolutionDTO from '@modules/forms/dtos/IFindMyResolutionDTO';


class FakeResolutionRepository implements IResolutionRepository {
   private resolutions: Resolution[] = [];

   async store({ delivered, answers, form_id, user_id }: IStoreResolutionDTO): Promise<Resolution> {
      const resolution = new Resolution();

      Object.assign(resolution, {
         delivered,
         answers,
         form_id,
         user_id
      });

      this.resolutions.push(resolution);
      return resolution;
   }

   async merge(resolution: Resolution, { delivered, answers }: IMergeResolutionDTO): Promise<Resolution> 
   {
      Object.assign(resolution, {
         delivered,
         answers
      });

      return resolution;
   }

   async save(resolution: Resolution): Promise<Resolution> 
   {
      const index = this.resolutions.findIndex(obj => obj.id === resolution.id);
      this.resolutions[index] = resolution;
      return resolution;
   }

   async findById(id: string): Promise<Resolution | undefined> {
      return this.resolutions.find(resolution => resolution.id === id);
   }

   async findByFormId(form_id: string): Promise<Resolution | undefined> {
      return this.resolutions.find(resolution => resolution.form_id === form_id);
   }

   async findMyResolution({ user_id, form_id }: IFindMyResolutionDTO): Promise<Resolution | undefined> {
      return this.resolutions.find(resolution => 
         resolution.user_id === user_id && 
         resolution.form_id === form_id
      );
   }

   async findDeliveredFrom(id: string): Promise<Resolution | undefined> 
   {
      return this.resolutions.find(resolution => 
         resolution.form_id === id &&
         resolution.delivered === true
      );
   }

   async delete(resolution_id: string): Promise<void> {
      const index = this.resolutions.findIndex(resolution => resolution.id === resolution_id);
      this.resolutions.splice(index, 1);
   }
}


export default FakeResolutionRepository;
