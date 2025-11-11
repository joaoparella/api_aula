import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PessoaController } from './pessoa.controller';

import { PessoaService } from './pessoa.service';
import { pessoaProviders } from './pessoa.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [PessoaController],
  providers: [
    ...pessoaProviders,
    PessoaService,
  ],
})
export class PessoaModule {}