import { MigrationInterface, QueryRunner, Table } from 'typeorm';


export class CreateTokens1615056958029 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'tokens',
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
						name: 'value',
						type: 'uuid',
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()'
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
						name: 'user_token',
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
		await queryRunner.dropTable('tokens');
   }
}
