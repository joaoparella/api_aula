import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { EmailUnicoValidator } from './validacao/email-unico.validator';
import { StrongPassValidator } from 'src/validacao/strong-pass.validtaor';
import { DatabaseModule } from 'src/database/database.module';
import { USUARIOService } from './usuario.service';
import { usuarioProviders } from './usuario.provider';
import { pessoaProviders } from 'src/pessoa/pessoa.provider';
import { PessoaService } from 'src/pessoa/pessoa.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsuarioController],
  providers: [...usuarioProviders,
    USUARIOService,
    ...pessoaProviders,
    PessoaService,
    EmailUnicoValidator,
    StrongPassValidator],
})
export class UsuarioModule {}