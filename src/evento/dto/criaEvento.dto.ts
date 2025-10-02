import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { DiaSemana } from "src/validacao/dia.validator";

export class criaEventoDTO {
    @IsString()
    @IsNotEmpty({message: 'O nome não pode ser vazio'})
    @ApiProperty({example: 'Voley',
                    description: 'Nome do evento'}
    )
    nome: string;    

    @IsString()
    @IsNotEmpty({message: 'O horario não pode ser vazio'})
    @ApiProperty({example: '18:00',
                    description: 'Horário do evento no formato HH:MM'}
    )
    horario: string;

    @IsString()
    @IsNotEmpty({message: 'O dia não pode ser vazio'})
    @DiaSemana({message: 'O dia deve ser um dia da semana válido'})
    @ApiProperty({example: 'Segunda-feira',
                    description: 'Dia da semana em que o evento ocorre, deve ser um dia válido'}
    )
    dia: string;

    @IsString()
    @IsNotEmpty({message: 'Complemento não pode ser vazio'})
    @ApiProperty({example: 'Número 123, Apto 45',
                       description: 'Complemento do endereço do evento'}
    )
    complemento: string;


    @IsString()
    @IsNotEmpty({message: 'CEP não pode ser vazio'})
    @ApiProperty({example: '12345-678',
                    description: 'CEP do endereço do evento'}
    )
    cep: string;

}