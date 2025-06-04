import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749017053424 implements MigrationInterface {
    name = 'Migration1749017053424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "testing" ADD "test" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "testing" DROP COLUMN "test"`);
    }

}
