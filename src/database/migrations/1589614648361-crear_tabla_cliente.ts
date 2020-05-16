import {MigrationInterface, QueryRunner} from "typeorm";

export class crearTablaCliente1589614648361 implements MigrationInterface {
    name = 'crearTablaCliente1589614648361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clientes" ("id" SERIAL NOT NULL, "DNI" integer NOT NULL, "nombre" character varying(60) NOT NULL, "apellido" character varying(60) NOT NULL, "telefono" character varying(60) NOT NULL, "email" character varying(150) NOT NULL, CONSTRAINT "PK_d76bf3571d906e4e86470482c08" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "clientes"`, undefined);
    }

}
