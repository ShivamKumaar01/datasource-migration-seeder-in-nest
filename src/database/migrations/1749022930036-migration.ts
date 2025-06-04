import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749022930036 implements MigrationInterface {
    name = 'Migration1749022930036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "interest" character varying(15) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "interest"`);
    }

}
