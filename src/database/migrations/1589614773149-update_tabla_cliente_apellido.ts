import {MigrationInterface, QueryRunner} from "typeorm";

export class updateTablaClienteApellido1589614773149 implements MigrationInterface {
    name = 'updateTablaClienteApellido1589614773149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clientes" ALTER COLUMN "apellido" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clientes" ALTER COLUMN "apellido" SET NOT NULL`, undefined);
    }

}
