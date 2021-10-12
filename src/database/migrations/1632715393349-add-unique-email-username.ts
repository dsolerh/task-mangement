import {MigrationInterface, QueryRunner} from "typeorm";

export class addUniqueEmailUsername1632715393349 implements MigrationInterface {
    name = 'addUniqueEmailUsername1632715393349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE UNIQUE INDEX \`IDX_f4ca2c1e7c96ae6e8a7cca9df8\` ON \`task-management\`.\`user\` (\`username\`, \`email\`)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX \`IDX_f4ca2c1e7c96ae6e8a7cca9df8\` ON \`task-management\`.\`user\`
        `);
    }

}
