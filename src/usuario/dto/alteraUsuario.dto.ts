import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";
import { ApiProperty } from "@nestjs/swagger";
import { SenhaForte } from "src/validacao/strong-pass.validtaor";

export class AlteraUsuarioDTO {
  @IsString()
  @IsNotEmpty({ message: "Nome não pode ser vazio" })
  @IsOptional()
  @ApiProperty({example: 'João Silva',
                description: 'Nome completo do usuário'}
  )
  nome: string;

  @IsEmail(undefined, { message: "Email inválido" })
  @EmailUnico({ message: "Já existe usuário com esse email" })
  @IsOptional()
   @ApiProperty({example: 'joaosilva@joao.com.br',
                description: 'Email do usuário, deve ser único'}
  )
  email: string;

  @MinLength(6, { message: "Tamanho da senha inválido" })
  @IsOptional()
   @ApiProperty({example: 'Senha123',
                description: 'Senha do usuário, deve ter no mínimo 6 caracteres, deve ser forte'}
  )
  @SenhaForte({message: 'A senha deve ser mais forte'})
  senha: string;

  @IsInt({ message: "Idade inválida" })
  @IsOptional()
   @ApiProperty({example: 30,
                description: 'Idade do usuário, deve ser um número inteiro'}
  )
  idade: number;

  @IsString({ message: "Cidade inválida" })
  @IsOptional()
  @ApiProperty({example: 'São Paulo',
                description: 'Cidade do usuário'}
  )
  cidade: string;

  @IsString({ message: "Telefone inválido" })
  @IsOptional()
  @ApiProperty({example: '(11) 99999-9999',
                description: 'Telefone do usuário'}
  )
  telefone: string;
}