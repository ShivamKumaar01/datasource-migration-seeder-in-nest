import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1748951625111 implements MigrationInterface {
    name = 'Migration1748951625111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "testing" ADD "test" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "testing" DROP COLUMN "test"`);
    }

}
