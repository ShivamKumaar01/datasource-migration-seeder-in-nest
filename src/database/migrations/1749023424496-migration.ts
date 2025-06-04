import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749023424496 implements MigrationInterface {
    name = 'Migration1749023424496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "interest" character varying(15)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "interest"`);
    }

}
