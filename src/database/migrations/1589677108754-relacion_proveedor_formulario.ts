import {MigrationInterface, QueryRunner} from "typeorm";

export class relacionProveedorFormulario1589677108754 implements MigrationInterface {
    name = 'relacionProveedorFormulario1589677108754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "formularios" ADD "proveedorId" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "formularios" ADD CONSTRAINT "FK_ca5da6e5e502afbdceb2fae9c92" FOREIGN KEY ("proveedorId") REFERENCES "proveedors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "formularios" DROP CONSTRAINT "FK_ca5da6e5e502afbdceb2fae9c92"`, undefined);
        await queryRunner.query(`ALTER TABLE "formularios" DROP COLUMN "proveedorId"`, undefined);
    }

}
