import { 
   Entity, 
   Column, 
   PrimaryGeneratedColumn,
   CreateDateColumn, 
   UpdateDateColumn,
   ManyToOne,
   OneToMany,
   JoinColumn
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

import Form from './Form';
import Answer from './Answer';


@Entity('resolutions')
class Resolution 
{
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   from: string;

   @Column('uuid')
   form_id: string;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;


   @OneToMany(() => Answer, answer => answer.resolution, { cascade: true, eager: true })
   answers: Answer[];

   @ManyToOne(() => Form)
   @JoinColumn({ name: 'form_id' })
   form: Form;

   @ManyToOne(() => User)
   @JoinColumn({ name: 'user_id' })
   user: User;
   
}


export default Resolution;
