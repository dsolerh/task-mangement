import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationUserTask1632945511794 implements MigrationInterface {
    name = 'addRelationUserTask1632945511794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`task-management\`.\`task\`
            ADD \`userId\` int NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`task-management\`.\`task\`
            ADD CONSTRAINT \`FK_f316d3fe53497d4d8a2957db8b9\` FOREIGN KEY (\`userId\`) REFERENCES \`task-management\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`task-management\`.\`task\` DROP FOREIGN KEY \`FK_f316d3fe53497d4d8a2957db8b9\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`task-management\`.\`task\` DROP COLUMN \`userId\`
        `);
    }

}
