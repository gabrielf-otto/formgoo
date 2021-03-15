import { MigrationInterface, QueryRunner, Table } from "typeorm";


export class CreateQuestions1615721832914 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'questions',
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
						name: 'type',
						type: 'varchar'
					},
					{
						name: 'content',
						type: 'varchar'
					},
					{
						name: 'options',
						type: 'jsonb',
						isNullable: true
					},
					{
						name: 'position',
						type: 'int'
					},
					{
						name: 'required',
						type: 'boolean',
						default: false
					},
					{
						name: 'form_id',
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
						name: 'form_question',
						columnNames: ['form_id'],
						referencedColumnNames: ['id'],
						referencedTableName: 'forms',
						onUpdate: 'CASCADE',
						onDelete: 'CASCADE'
					}
				]
			})
		);
	}

   public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('questions');
   }

}
