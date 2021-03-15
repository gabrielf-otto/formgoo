import { 
   Entity, 
   Column, 
   PrimaryGeneratedColumn,
   Generated,
   CreateDateColumn, 
   UpdateDateColumn
} from 'typeorm';


@Entity('tokens')
class Token
{
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   @Generated('uuid')
   value: string;

   @Column()
   user_id: string;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;

}


export default Token;
