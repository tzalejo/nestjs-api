import {MigrationInterface, QueryRunner} from "typeorm";

export class relacionClienteFormulario1589676777460 implements MigrationInterface {
    name = 'relacionClienteFormulario1589676777460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "formularios" ADD "clienteId" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "formularios" ADD CONSTRAINT "FK_12d3f8f2464de70aa64ce5be022" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "formularios" DROP CONSTRAINT "FK_12d3f8f2464de70aa64ce5be022"`, undefined);
        await queryRunner.query(`ALTER TABLE "formularios" DROP COLUMN "clienteId"`, undefined);
    }

}
