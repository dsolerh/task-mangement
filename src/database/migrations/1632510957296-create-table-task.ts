import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableTask1632510957296 implements MigrationInterface {
    name = 'createTableTask1632510957296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`task-management\`.\`task\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`title\` varchar(255) NOT NULL,
                \`description\` varchar(255) NOT NULL,
                \`status\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE \`task-management\`.\`task\`
        `);
    }

}
