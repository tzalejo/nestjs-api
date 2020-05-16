import {MigrationInterface, QueryRunner} from "typeorm";

export class crearTablaProveedor1589615988370 implements MigrationInterface {
    name = 'crearTablaProveedor1589615988370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "proveedors" ("id" SERIAL NOT NULL, "DNI" integer, "nombre" character varying(60), "apellido" character varying(60) NOT NULL, "telefono" character varying(60), "email" character varying(150), CONSTRAINT "PK_16e16c3c180d2446e1507a8af7a" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "proveedors"`, undefined);
    }

}
