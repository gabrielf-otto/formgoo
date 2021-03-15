import { getRepository, Repository } from 'typeorm';

import Resolution from '../entities/Resolution';
import IResolutionRepository from '@modules/forms/repositories/IResolutionRepository';
import IMergeResolutionDTO from '@modules/forms/dtos/IMergeResolutionDTO';
import IStoreResolutionDTO from '@modules/forms/dtos/IStoreResolutionDTO';
import IFindMyResolutionDTO from '@modules/forms/dtos/IFindMyResolutionDTO';


class ResolutionRepository implements IResolutionRepository {
   private repository: Repository<Resolution>;

   constructor() {
      this.repository = getRepository(Resolution);
   }

   async store({ delivered, answers, form_id, user_id }: IStoreResolutionDTO): Promise<Resolution> 
   {
      const resolution = await this.repository.create({
         delivered,
         answers,
         form_id,
         user_id
      });

      return await this.repository.save(resolution);
   }

   async merge(resolution: Resolution, { delivered, answers }: IMergeResolutionDTO): Promise<Resolution> 
   {
      return await this.repository.merge(resolution, {
         delivered,
         answers
      });
   }

   async save(resolution: Resolution): Promise<Resolution> {
      return await this.repository.save(resolution);
   }

   async findById(id: string): Promise<Resolution | undefined> {
      return await this.repository.findOne({ where: { id } });
   }

   async findMyResolution({ user_id, form_id }: IFindMyResolutionDTO): Promise<Resolution | undefined> {
      return await this.repository.findOne({ where: { user_id, form_id } });
   }

   async findDeliveredFrom(id: string): Promise<Resolution | undefined> {
      return this.repository.findOne({ where: { form_id: id, delivered: true } });
   }

   async delete(resolution_id: string): Promise<void> {
      await this.repository.delete(resolution_id);
   }
}


export default ResolutionRepository;
