import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CommentaryTable1618031211431 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "commentary",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary:true,
                },
                {
                    name: "comment",
                    type: "varchar",
                },
                {
                    name: "like",
                    type: "number",
                    isNullable: true,
                    default: 0,                   
                },
                {
                    name: "dislike",
                    type: "number",
                    isNullable: true,
                    default:0
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default:"now()"
                },
                {
                    name: "user_id",
                    type:"uuid",
                }
            ],
            foreignKeys: [
                {
                    name: "FKUser",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["user_id"],
                    onDelete: "CASCADE",
                    onUpdate:"CASCADE"                   
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("commentary")
    }

}
