import { 
   Entity, 
   Column, 
   PrimaryGeneratedColumn,
   CreateDateColumn, 
   UpdateDateColumn,
   ManyToOne,
   JoinColumn,
   Unique
} from 'typeorm';

import Form from './Form';


@Entity('questions')
@Unique(['form_id', 'position'])
class Question 
{
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   type: string;

   @Column()
   content: string;

   @Column('jsonb', { default: [] })
   options: string[];

   @Column('int')
   position: number;

   @Column('boolean', { default: false })
   required: boolean;

   @Column('uuid')
   form_id: string;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;


   @ManyToOne(() => Form)
   @JoinColumn({ name: 'form_id' })
   form: Form;

}


export default Question;
