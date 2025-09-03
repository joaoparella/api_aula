import { IsString, IsEmail, MinLength, IsNotEmpty, IsNumber } from "class-validator";

export class CriaUsuarioDTO {
  @IsString()
  @IsNotEmpty({message: 'O nome não pode ser vazio'})
  nome: string;

  @IsEmail(undefined,{message: 'Email inválido'})
  @IsString()
  @IsNotEmpty()
  email: string;

  @MinLength(6,{message: 'A senha deve ter no mínimo 6 caracteres'})
  @IsNotEmpty()
  @IsString()
  senha: string;

  @IsNotEmpty()
  @IsNumber(undefined,{message: 'Idade deve ser um número inteiro'})    
  idade: number;

  @IsNotEmpty({message: 'Cidade não pode ser vazia'})
  @IsString()
  cidade: string;

  @IsNotEmpty({message: 'Telefone não pode ser vazio'})
  @IsString()
  telefone: string;
}