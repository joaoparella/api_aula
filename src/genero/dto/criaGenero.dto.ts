import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CriaGeneroDTO {
  @IsString()
  @IsNotEmpty({ message: "Nome não pode ser vazio" })
  @ApiProperty({example: 'Terror',   
      description: 'Nome do genero'} 
    ) 
  NOME: string;

  @IsString()
  @IsNotEmpty({ message: "Descrição não pode ser vazio" })
  @ApiProperty({example: 'Descricação geral do gênero',   
      description: 'Descrição do genero'} 
    ) 
  DESCRICAO: string;
}