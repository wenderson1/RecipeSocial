import { User } from "./user";
import { v4 as uuid} from 'uuid';
import { Commentary } from "./commentary";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";

@Entity("recipe")
class Recipe{

    @PrimaryColumn()
    readonly id: string;

    @Column()
    ingredients: string
    
    @Column()
    preparation_mode: string

    @Column()
    like:number;

    @Column()
    dislike: number;
    
    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User)
    @JoinColumn({name:"user_id"})
    user: User; //chave fk

    @ManyToMany(() => Commentary)
    @JoinColumn({name:"commentary_id"})
    commentary: Commentary; //chave fk

    constructor() {
        if (!this.id)
            this.id = uuid();
    }

}

export { Recipe };