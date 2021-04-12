

import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class RecipeTable1618031231655 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.createTable(new Table({
            name: "recipe",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary:true,
                },
                {
                    name: "title",
                    type: "varchar",
                },
                {
                    name: "ingredients",
                    type: "varchar",
                    
                },
                {
                    name: "preparation_mode",
                    type: "varchar",
                },
                {
                    name: "like",
                    type: "number",
                    default: 0,
                    isNullable:true
                },
                 {
                    name: "dislike",
                    type: "number",
                    default: 0,
                    isNullable:true
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "user_id",
                    type:"uuid"
                },
                {
                    name: "commentary_id",
                    type: "uuid",
                    isNullable: true,
                    isArray:true
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
                },
                {
                    name: "FKCommentary",
                    referencedTableName: "commentary",
                    referencedColumnNames: ["id"],
                    columnNames: ["commentary_id"],
                    onDelete: "CASCADE",
                    onUpdate:"CASCADE"
                }
            ]

        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("recipe");
    }

}

