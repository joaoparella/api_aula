import { GENERO } from "src/genero/genero.entity";
import { PESSOA } from "src/pessoa/pessoa.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class FILME{
    @PrimaryColumn()
    ID: string;

    @Column({length: 255})
    NOME: string;

    @Column('int')
    DURACAO: number;

    @Column({length: 500})
    SINOPSE: string;

    @Column({length: 20})
    ANO: string;

    @ManyToOne(() => GENERO, genero => genero.FILMES)
    @JoinColumn({name: 'IDGENERO', referencedColumnName: 'ID'})
    genero: GENERO;


     @ManyToMany(
        () => PESSOA,
        ator => ator.filmes,
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION',},
      )
    atores?: PESSOA[];
}