import { MigrationInterface, QueryRunner } from 'typeorm'

export class OnBoardUserEntity1699325775451 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE on_board_user(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    usecase VARCHAR(255),
    industry VARCHAR(255),
    companysize VARCHAR(255),
    companyname VARCHAR(255),
    name VARCHAR(255), 
    email VARCHAR(255),
    designation VARCHAR(255),
    phone VARCHAR(20),
    requirements TEXT,
    dataprivacy BOOLEAN,
    marketingconsent BOOLEAN,
    "createdDate" timestamp NOT NULL DEFAULT now(),
    "updatedDate" timestamp NOT NULL DEFAULT now(),
    CONSTRAINT "PK_Onboard_User" PRIMARY KEY (id))`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE assistant`)
    }
}
