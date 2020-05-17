import {MigrationInterface, QueryRunner} from "typeorm";

export class relacionUserFormulario1589676341917 implements MigrationInterface {
    name = 'relacionUserFormulario1589676341917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "formularios" ADD "userId" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "formularios" ADD CONSTRAINT "FK_e4889b36dd8108f69915ccc864d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "formularios" DROP CONSTRAINT "FK_e4889b36dd8108f69915ccc864d"`, undefined);
        await queryRunner.query(`ALTER TABLE "formularios" DROP COLUMN "userId"`, undefined);
    }

}
