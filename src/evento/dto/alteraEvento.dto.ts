import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { DiaSemana } from "src/validacao/dia.validator";

export class alteraEventoDTO {
    @IsString()
    @IsOptional()
    @IsNotEmpty({message: 'O nome não pode ser vazio'})
    nome: string;    

    @IsString()
    @IsOptional()
    @IsNotEmpty({message: 'O horario não pode ser vazio'})
    horario: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty({message: 'O dia não pode ser vazio'})
    @DiaSemana({message: 'O dia deve ser um dia da semana válido'})
    dia: string;

}