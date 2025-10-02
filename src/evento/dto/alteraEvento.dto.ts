import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { DiaSemana } from "src/validacao/dia.validator";

export class alteraEventoDTO {
    @IsString()
    @IsOptional()
    @IsNotEmpty({message: 'O nome não pode ser vazio'})
    @ApiPropertyOptional({example: 'Voley',
                        description: 'Nome do evento'}
        )
    nome: string;    

    @IsString()
    @IsOptional()
    @IsNotEmpty({message: 'O horario não pode ser vazio'})
    @ApiPropertyOptional({example: '18:00',
                        description: 'Horário do evento no formato HH:MM'}
        )
    horario: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty({message: 'O dia não pode ser vazio'})
    @DiaSemana({message: 'O dia deve ser um dia da semana válido'})
    @ApiPropertyOptional({example: 'Segunda-feira',
                        description: 'Dia da semana em que o evento ocorre, deve ser um dia válido'}
        )
    dia: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty({message: 'Complemento não pode ser vazio'})
    @ApiPropertyOptional({example: 'Número 123, Apto 45',
                    description: 'Complemento do endereço do evento'}
    )
    complemento: string;


    @IsString()
    @IsOptional()
    @IsNotEmpty({message: 'CEP não pode ser vazio'})
    @ApiPropertyOptional({example: '12345-678',
                    description: 'CEP do endereço do evento'}
    )
    cep: string;

}