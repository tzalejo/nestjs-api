import {MigrationInterface, QueryRunner} from "typeorm";

export class updateTablaClienteOtrosCampos1589614956928 implements MigrationInterface {
    name = 'updateTablaClienteOtrosCampos1589614956928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clientes" ALTER COLUMN "DNI" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "clientes" ALTER COLUMN "nombre" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "clientes" ALTER COLUMN "apellido" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "clientes" ALTER COLUMN "telefono" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "clientes" ALTER COLUMN "email" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clientes" ALTER COLUMN "email" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "clientes" ALTER COLUMN "telefono" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "clientes" ALTER COLUMN "apellido" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "clientes" ALTER COLUMN "nombre" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "clientes" ALTER COLUMN "DNI" SET NOT NULL`, undefined);
    }

}
