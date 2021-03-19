import Resolution from '@modules/forms/infra/typeorm/entities/Resolution';
import IStoreResolutionDTO from '@modules/forms/dtos/IStoreResolutionDTO';
import IResolutionRepository from '../IResolutionRepository';


class FakeResolutionRepository implements IResolutionRepository {
   private resolutions: Resolution[] = [];

   async store({ answers, from, form_id }: IStoreResolutionDTO): Promise<Resolution> {
      const resolution = new Resolution();

      Object.assign(resolution, {
         answers,
         from,
         form_id
      });

      this.resolutions.push(resolution);
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

   async findFormResolutions(form_id: string): Promise<Resolution[]> {
      return this.resolutions.filter(resolution => resolution.form_id === form_id);
   }

   async deleteById(id: string): Promise<void> {
      const index = this.resolutions.findIndex(resolution => resolution.id === id);
      this.resolutions.splice(index, 1);
   }
}


export default FakeResolutionRepository;
