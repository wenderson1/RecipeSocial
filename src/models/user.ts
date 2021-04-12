import { Column, CreateDateColumn, Entity, PrimaryColumn, BeforeInsert,BeforeUpdate } from "typeorm";
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';



@Entity("users")
class User{

    @PrimaryColumn()
    readonly id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if (!this.id)
            this.id = uuid();
    }
    
    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        this.password = bcrypt.hashSync(this.password, 8);
    }
}



export{ User };