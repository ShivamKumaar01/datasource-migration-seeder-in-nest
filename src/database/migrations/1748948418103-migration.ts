import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1748948418103 implements MigrationInterface {
    name = 'Migration1748948418103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "testing" RENAME COLUMN "admin" TO "testing"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "testing" RENAME COLUMN "testing" TO "admin"`);
    }

}
