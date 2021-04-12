import { v4 as uuid} from 'uuid';
import { User } from './user';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity("commentary")
class Commentary{
    @PrimaryColumn()
    readonly id: string;

    @Column()
    comment: string;

    @Column()
    like?: number;

    @Column()
    dislike?: number;

    @ManyToOne(() => User)
    @JoinColumn({name:"user_id"})
    user: User; //chave fk

    @CreateDateColumn()
    created_at: Date;



    constructor(comment:string, user:User){
        if (!this.id)
            this.id = uuid();
    }
}

export{ Commentary };