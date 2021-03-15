import { 
   Entity, 
   Column, 
   PrimaryGeneratedColumn, 
   CreateDateColumn, 
   UpdateDateColumn,
   
   ManyToMany,
   JoinTable
} from 'typeorm';

import Form from '@modules/forms/infra/typeorm/entities/Form';
import { Exclude } from 'class-transformer';


@Entity('users')
class User 
{
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   email: string;

   @Column()
   @Exclude()
   password: string;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;


   @ManyToMany(() => Form, { cascade: true, lazy: true })
   @JoinTable({ 
      name: 'user_forms', 
      joinColumn: { 
         name: 'user_id',
         referencedColumnName: 'id' 
      },
      inverseJoinColumn: {
         name: 'form_id',
         referencedColumnName: 'id'
      }
   })
   forms: Form[];
}


export default User;
