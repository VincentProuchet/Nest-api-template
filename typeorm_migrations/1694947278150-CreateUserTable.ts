import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUserTable1694947278150 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                CREATE TABLE user
                {
                    id INT NOT NULL AUTO_INCREMENT,
                    email VARCHAR(64) NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    CONSTRAINT PK_user PRIMARY KEY (id)
                };
            `,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                DROP TABLE user;
            `,
        )
    }

}
