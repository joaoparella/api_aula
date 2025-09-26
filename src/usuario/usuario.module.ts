import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuariosArmazenados } from './usuario.dm';
import { EmailUnicoValidator } from './validacao/email-unico.validator';
import { StrongPassValidator } from 'src/validacao/strong-pass.validtaor';

@Module({
  controllers: [UsuarioController],
  providers: [UsuariosArmazenados,EmailUnicoValidator,StrongPassValidator],
})
export class UsuarioModule {}