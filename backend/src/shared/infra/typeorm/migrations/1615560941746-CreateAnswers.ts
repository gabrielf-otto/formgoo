import { MigrationInterface, QueryRunner, Table } from "typeorm";


export class CreateAnswers1615722209498 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'answers',
				columns: 
				[
					{ 
						name: 'id', 
						type: 'uuid', 
						isPrimary: true, 
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()'
					},
					{
						name: 'content',
						type: 'varchar'
					},
					{
						name: 'attachment',
						type: 'varchar',
						isNullable: true
					},
					{
						name: 'question_id',
						type: 'uuid'
					},
					{
						name: 'resolution_id',
						type: 'uuid'
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()'
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'now()'
					}
				],

				foreignKeys: 
				[
					{
						name: 'question_answer',
						columnNames: ['question_id'],
						referencedColumnNames: ['id'],
						referencedTableName: 'questions',
						onUpdate: 'CASCADE',
						onDelete: 'CASCADE'
					},
					{
						name: 'resolution_answer',
						columnNames: ['resolution_id'],
						referencedColumnNames: ['id'],
						referencedTableName: 'resolutions',
						onUpdate: 'CASCADE',
						onDelete: 'CASCADE'
					}
				]
			})
		);
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('answers');
   }

}
