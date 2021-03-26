import { 
   Entity, 
   Column, 
   PrimaryGeneratedColumn,
   CreateDateColumn, 
   UpdateDateColumn,
   ManyToOne,
   JoinColumn,
   OneToMany
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Question from './Question';


@Entity('forms')
class Form 
{
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   title: string;

   @Column()
   description: string;

   @Column('uuid')
   user_id: string;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;


   @OneToMany(() => Question, question => question.form, { 
      cascade: true, 
      eager: true 
   })
   questions: Question[];

   @ManyToOne(() => User)
   @JoinColumn({ name: 'user_id' })
   user: User;
}


export default Form;
