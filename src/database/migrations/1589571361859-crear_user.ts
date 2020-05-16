import {MigrationInterface, QueryRunner} from "typeorm";

export class crearUser1589571361859 implements MigrationInterface {
    name = 'crearUser1589571361859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(60) NOT NULL, "apellido" character varying(60) NOT NULL, "email" character varying(60) NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`, undefined);
    }

}
