import { IsDateString, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SenhaForte } from "src/validacao/strong-pass.validtaor";
import { CriaPessoaDTO } from "src/pessoa/dto/criaPessoa.dto";

export class AlteraUsuarioDTO {

  @IsEmail(undefined, { message: "Email inválido" })
  @EmailUnico({ message: "Já existe usuário com esse email" })
  @IsOptional()
   @ApiPropertyOptional({example: 'joaosilva@joao.com.br',
                description: 'Email do usuário, deve ser único'}
  )
  EMAIL: string;

  @MinLength(6, { message: "Tamanho da senha inválido" })
  @IsOptional()
   @ApiPropertyOptional({example: 'Senha123',
                description: 'Senha do usuário, deve ter no mínimo 6 caracteres, deve ser forte'}
  )
  @SenhaForte({message: 'A senha deve ser mais forte'})
  SENHA: string;



  @IsString({ message: "Cidade inválida" })
  @IsOptional()
  @ApiPropertyOptional({example: 'São Paulo',
                description: 'Cidade do usuário'}
  )
  CIDADE: string;

  @IsString({ message: "Telefone inválido" })
  @IsOptional()
  @ApiPropertyOptional({example: '(11) 99999-9999',
                description: 'Telefone do usuário'}
  )
  TELEFONE: string;

  
  // @ApiPropertyOptional({
  //     example: '{"NOME": "JOAO" , "NASCIMENTO": "1995-01-01", "PAIS":"BRASIL"}',
  //     description: "DADOS do usuário, deve ser informado um objeto com os dados descritos"
  // })
  // PESSOA: CriaPessoaDTO;
}