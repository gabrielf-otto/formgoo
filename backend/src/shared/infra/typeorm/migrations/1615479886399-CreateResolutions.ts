import { MigrationInterface, QueryRunner, Table } from "typeorm";


export class CreateResolutions1615479886399 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'resolutions',
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
						name: 'from',
						type: 'varchar'
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
						name: 'form_resolution',
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
		await queryRunner.dropTable('resolutions')
   }

}
