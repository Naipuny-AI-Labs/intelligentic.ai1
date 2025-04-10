import { MigrationInterface, QueryRunner } from 'typeorm'

export class AgentEntity1699325775451 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE agent (
       id uuid NOT NULL DEFAULT uuid_generate_v4(),
       name TEXT NOT NULL,
       description TEXT,
       category TEXT,
       tags TEXT[],
       pricing TEXT, 
       featured BOOLEAN DEFAULT FALSE,
       "createdDate" timestamp without time zone NOT NULL DEFAULT now(),
       "updatedDate" timestamp without time zone NOT NULL DEFAULT now(),
       CONSTRAINT "PK_agent" PRIMARY KEY (id)
    )`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE agent`)
    }
}
