import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddStatusToOnboardUser1711538016098 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "on_board_user" ADD COLUMN IF NOT EXISTS "status"VARCHAR(255) DEFAULT 'pending';`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "on_board_user" DROP COLUMN "status";`)
    }
}
