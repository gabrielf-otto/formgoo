import { getRepository, Repository } from 'typeorm';

import Resolution from '../entities/Resolution';
import IResolutionRepository from '@modules/forms/repositories/IResolutionRepository';
import IStoreResolutionDTO from '@modules/forms/dtos/IStoreResolutionDTO';


class ResolutionRepository implements IResolutionRepository {
   private repository: Repository<Resolution>;

   constructor() {
      this.repository = getRepository(Resolution);
   }

   async store({ answers, from, form_id }: IStoreResolutionDTO): Promise<Resolution> 
   {
      const resolution = await this.repository.create({
         answers,
         from,
         form_id,
      });

      return await this.repository.save(resolution);
   }

   async save(resolution: Resolution): Promise<Resolution> {
      return await this.repository.save(resolution);
   }

   async findById(id: string): Promise<Resolution | undefined> {
      return await this.repository.findOne({ where: { id } });
   }

   async findFormResolutions(form_id: string): Promise<Resolution[]> {
      return await this.repository.find({ where: { form_id } });
   }

   async deleteById(id: string): Promise<void> {
      await this.repository.delete(id);
   }
}


export default ResolutionRepository;
