import { IsString, IsEmail, MinLength, IsNotEmpty, IsNumber, IsDate, IsDateString } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SenhaForte } from "src/validacao/strong-pass.validtaor";
import { CriaPessoaDTO } from "src/pessoa/dto/criaPessoa.dto";

export class CriaUsuarioDTO {
  @IsEmail(undefined,{message: 'Email inválido'})
  @IsString()
  @IsNotEmpty()
  @EmailUnico({message: 'Email já cadastrado'})
  @ApiProperty({example: 'joaosilva@joao.com.br',
                description: 'Email do usuário, deve ser único'}
  )
  EMAIL: string;

  @MinLength(6,{message: 'A senha deve ter no mínimo 6 caracteres'})
  @IsNotEmpty()
  @IsString()
  @ApiProperty({example: 'senha123',  
                description: 'Senha do usuário, deve ter no mínimo 6 caracteres, deve ser forte'}
  )
  @SenhaForte({message: 'A senha deve ser mais forte'})
  SENHA: string;

  @IsNotEmpty({message: 'Cidade não pode ser vazia'})
  @IsString()
  @ApiProperty({example: 'São Paulo',   
                description: 'Cidade do usuário'} 
  ) 
  CIDADE: string;

  @IsNotEmpty({message: 'Telefone não pode ser vazio'})
  @IsString()
  @ApiProperty({example: '(11) 99999-9999',   
                description: 'Telefone do usuário'} 
  ) 
  TELEFONE: string;

  @IsNotEmpty()
  @ApiProperty({
      example: '{"NOME": "JOAO" , "NASCIMENTO": "1995-01-01", "PAIS":"BRASIL"}',
      description: "DADOS do usuário, deve ser informado um objeto com os dados descritos"
  })
  PESSOA: CriaPessoaDTO;
}