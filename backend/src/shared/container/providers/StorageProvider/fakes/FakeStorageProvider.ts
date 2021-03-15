import IStorageProvider from '../models/IStorageProvider';


class FakeStorageProvider implements IStorageProvider {
   private storage: string[] = [];

   async save(file: string): Promise<string> {
      this.storage.push(file);
      return file;
   }
   
   async delete(file: string): Promise<void> {
      const index = this.storage.findIndex(obj => obj === file);
      this.storage.splice(index, 1);
   }
}


export default FakeStorageProvider;
