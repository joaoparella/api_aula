import { IsNotEmpty, IsString } from "class-validator";
import { DiaSemana } from "src/validacao/dia.validator";

export class criaEventoDTO {
    @IsString()
    @IsNotEmpty({message: 'O nome não pode ser vazio'})
    nome: string;    

    @IsString()
    @IsNotEmpty({message: 'O horario não pode ser vazio'})
    horario: string;

    @IsString()
    @IsNotEmpty({message: 'O dia não pode ser vazio'})
    @DiaSemana({message: 'O dia deve ser um dia da semana válido'})
    dia: string;

}