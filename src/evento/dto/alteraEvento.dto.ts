import { IsNotEmpty, IsOptional, IsString } from "class-validator";

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
    dia: string;

}