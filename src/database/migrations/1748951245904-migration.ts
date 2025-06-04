import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migration1748951245904 implements MigrationInterface {
    name = 'Migration1748951245904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "testing" ADD "test" character varying NOT NULL`);
        // await queryRunner.createTable(
        //     new Table({
        //         name: "skills",
        //         columns: [
        //             {
        //                 name: "id",
        //                 type: "int",
        //                 isPrimary: true,
        //                 generationStrategy: "increment",
        //             },
        //             {
        //                 name: "skill",
        //                 type: "varchar",
        //             },
        //         ],
        //     })
        // );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "testing" DROP COLUMN "test"`);
        // await queryRunner.query(` DROP TABLE skills`)
    }

}
