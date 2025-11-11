import * as bcrypt from "bcrypt";
import { PESSOA } from "src/pessoa/pessoa.entity";

import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";


@Entity()
export class USUARIO{
    @PrimaryColumn()
    ID: string;

    @Column({length: 255})
    CIDADE: string;

    @Column({length: 255})
    EMAIL: string;

    @Column({length: 255})
    TELEFONE: string;

    @Column({ type: 'datetime' })
    ASSINATURA: Date; 

    @Column({length: 255})
    SENHA: string; 

    @Column({length: 255})
    IDPESSOA: string; 

    // @Column({length: 255})
    // FOTO:string;


    @OneToOne(() => PESSOA)
    @JoinColumn({ name: 'IDPESSOA', referencedColumnName:'ID'})
    PESSOA: PESSOA;

    // @OneToOne(() => FILES)
    // @JoinColumn({ name: 'FOTO', referencedColumnName:'ID'})
    // FILE: FILES;
    
    trocaSenha(senha){
        const saltOrRounds = 10;
        this.SENHA = bcrypt.hashSync(senha,saltOrRounds)
    }


    login(senha: string): boolean{
        return bcrypt.compareSync(senha, this.SENHA);
    }
}