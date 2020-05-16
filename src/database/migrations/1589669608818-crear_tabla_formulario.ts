import {MigrationInterface, QueryRunner} from "typeorm";

export class crearTablaFormulario1589669608818 implements MigrationInterface {
    name = 'crearTablaFormulario1589669608818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "formularios" ("id" SERIAL NOT NULL, "web" character varying(60) NOT NULL, "compra_moneda" character varying(20) NOT NULL, "comision_prove" double precision NOT NULL, "comision_vendedor" double precision NOT NULL, "valor_comision_prove" double precision NOT NULL, "valor_comision_vendedor" double precision NOT NULL, "criptomoneda" double precision NOT NULL, "tipo_criptomoneda" character varying(20) NOT NULL, "importe_compra" double precision NOT NULL, "fecha_compra" character varying NOT NULL, "fecha" TIMESTAMP NOT NULL, "dolar" double precision NOT NULL, "estado" character varying(1) NOT NULL DEFAULT 'P', "costo_criptomoneda_p" double precision NOT NULL, "costo_criptomoneda_v" double precision NOT NULL, "ganancia_criptomoneda" double precision NOT NULL, CONSTRAINT "PK_99d35e86697a78044541773bd67" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "formularios"`, undefined);
    }

}
