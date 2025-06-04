import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1748948248501 implements MigrationInterface {
    name = 'Migration1748948248501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "testing" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "admin" character varying NOT NULL, CONSTRAINT "PK_d380da037e5aa1b6a5fd58c5b7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "testing"`);
    }

}
