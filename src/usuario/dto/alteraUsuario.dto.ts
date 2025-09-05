import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";

export class AlteraUsuarioDTO {
  @IsString()
  @IsNotEmpty({ message: "Nome não pode ser vazio" })
  @IsOptional()
  nome: string;

  @IsEmail(undefined, { message: "Email inválido" })
  @EmailUnico({ message: "Já existe usuário com esse email" })
  @IsOptional()
  email: string;

  @MinLength(6, { message: "Tamanho da senha inválido" })
  @IsOptional()
  senha: string;

  @IsInt({ message: "Idade inválida" })
  @IsOptional()
  idade: number;

  @IsString({ message: "Cidade inválida" })
  @IsOptional()
  cidade: string;

  @IsString({ message: "Telefone inválido" })
  @IsOptional()
  telefone: string;
}