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
						name: 'delivered',
						type: 'boolean',
						default: false
					},
					{
						name: 'form_id',
						type: 'uuid'
					},
					{
						name: 'user_id',
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
					},
					{
						name: 'user_resolution',
						columnNames: ['user_id'],
						referencedColumnNames: ['id'],
						referencedTableName: 'users',
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
