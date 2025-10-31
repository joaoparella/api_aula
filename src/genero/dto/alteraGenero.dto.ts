import { Optional } from "@nestjs/common";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AlteraGeneroDTO {
  @IsString()
  @Optional()
  @IsNotEmpty({ message: "Nome não pode ser vazio" })
  @ApiPropertyOptional({example: 'Terror',   
    description: 'Nome Do genero'} 
  ) 
  NOME: string;

  @IsString()
  @Optional()
  @IsNotEmpty({ message: "Descrição não pode ser vazio" })
  @ApiPropertyOptional({example: 'Descricação geral do gênero',   
    description: 'Descrição do genero'} 
  ) 
  DESCRICAO: string;
}