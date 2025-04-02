import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddNodesEntity1743471664812 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS nodes (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                accesstype varchar  NOT NULL,
                "nodeData" jsonb NOT NULL,
                "createdDate" timestamp NOT NULL DEFAULT now(),
                "updatedDate" timestamp NOT NULL DEFAULT now(),
                CONSTRAINT "PK_nodes" PRIMARY KEY (id)
            );`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE nodes`)
    }
}
