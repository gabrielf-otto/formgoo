import { 
   Entity, 
   Column, 
   PrimaryGeneratedColumn,
   CreateDateColumn, 
   UpdateDateColumn,
   ManyToOne,
   JoinColumn
} from 'typeorm';

import Question from './Question';
import Resolution from './Resolution';


@Entity('answers')
class Answer 
{
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   content: string;

   @Column({ nullable: true })
   attachment: string;

   @Column('uuid')
   question_id: string;

   @Column('uuid')
   resolution_id: string;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;


   @ManyToOne(() => Question)
   @JoinColumn({ name: 'question_id' })
   question: Question;

   @ManyToOne(() => Resolution)
   @JoinColumn({ name: 'resolution_id' })
   resolution: Resolution;

}


export default Answer;
