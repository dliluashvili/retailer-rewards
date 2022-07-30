import { MigrationInterface, QueryRunner } from "typeorm";

export class createUsersPaymentsAndMonthlyReportsTables1659197434516 implements MigrationInterface {
    name = 'createUsersPaymentsAndMonthlyReportsTables1659197434516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "monthly_report" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "date" TIMESTAMP NOT NULL, "quarter" integer NOT NULL, "point" integer NOT NULL, CONSTRAINT "PK_fe8b38d177d9ee8af29e9d970e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "email" character varying NOT NULL, "point" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "price" integer NOT NULL, "product" character varying NOT NULL, "description" character varying NOT NULL, "calculated_point" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "monthly_report" ADD CONSTRAINT "FK_bb688bbaf05065b39b1822c82c1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_427785468fb7d2733f59e7d7d39" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_427785468fb7d2733f59e7d7d39"`);
        await queryRunner.query(`ALTER TABLE "monthly_report" DROP CONSTRAINT "FK_bb688bbaf05065b39b1822c82c1"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "monthly_report"`);
    }

}
