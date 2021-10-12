import {MigrationInterface, QueryRunner} from "typeorm";

export class addSaltToUser1632753851189 implements MigrationInterface {
    name = 'addSaltToUser1632753851189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`task-management\`.\`user\`
            ADD \`salt\` varchar(255) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`task-management\`.\`user\` DROP COLUMN \`salt\`
        `);
    }

}
