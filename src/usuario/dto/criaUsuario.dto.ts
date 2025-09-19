import { IsString, IsEmail, MinLength, IsNotEmpty, IsNumber } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CriaUsuarioDTO {
  @IsString()
  @IsNotEmpty({message: 'O nome não pode ser vazio'})
  @ApiPropertyOptional({example: 'João Silva',
                description: 'Nome completo do usuário'}
  )
  nome: string;

  @IsEmail(undefined,{message: 'Email inválido'})
  @IsString()
  @IsNotEmpty()
  @EmailUnico({message: 'Email já cadastrado'})
  @ApiPropertyOptional({example: 'joaosilva@joao.com.br',
                description: 'Email do usuário, deve ser único'}
  )
  email: string;

  @MinLength(6,{message: 'A senha deve ter no mínimo 6 caracteres'})
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional({example: 'senha123',  
                description: 'Senha do usuário, deve ter no mínimo 6 caracteres'}
  )
  senha: string;

  @IsNotEmpty()
  @IsNumber(undefined,{message: 'Idade deve ser um número inteiro'})    
  @ApiPropertyOptional({example: 30,
                description: 'Idade do usuário, deve ser um número inteiro'}
  ) 
  idade: number;

  @IsNotEmpty({message: 'Cidade não pode ser vazia'})
  @IsString()
  @ApiPropertyOptional({example: 'São Paulo',   
                description: 'Cidade do usuário'} 
  ) 
  cidade: string;

  @IsNotEmpty({message: 'Telefone não pode ser vazio'})
  @IsString()
  @ApiPropertyOptional({example: '(11) 99999-9999',   
                description: 'Telefone do usuário'} 
  ) 
  telefone: string;
}