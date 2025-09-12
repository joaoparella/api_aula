import { IsNotEmpty, IsString } from "class-validator";

export class criaEventoDTO {
    @IsString()
    @IsNotEmpty({message: 'O nome não pode ser vazio'})
    nome: string;    

    @IsString()
    @IsNotEmpty({message: 'O horario não pode ser vazio'})
    horario: string;

    @IsString()
    @IsNotEmpty({message: 'O dia não pode ser vazio'})
    dia: string;

}